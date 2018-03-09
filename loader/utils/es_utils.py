'''
Created on April 2014

@author: klc

Utility functions for using the elastic search python client


'''
from __future__ import division
from elasticsearch import Elasticsearch
import logging
from elasticsearch.exceptions import TransportError
from elasticsearch.exceptions import NotFoundError
from elasticsearch import helpers
from datetime import datetime
import traceback
import json

import time
import pprint as pp

TIMEOUT = 300

class ElasticSearchTools(object):

    ''' Initializes the Elastic search api.  '''
    __es_doc_type__ = "unknown"
    __es_index__ = "unknown_index"
    __es_port__ = 0
    __es_id__ = 0
    es = Elasticsearch()
   
    __t0__ = 0.0
    __tb__ = time.time()
    __slow_query__ = 3.0    #query is slow if it runs longer than this 
    __log_interval__ = 10.0 #interval to print logging information
    
    def __init__(self, es_doc_type=None, es_index=None):
        self.__es_doc_type__ = es_doc_type
        self.__es_index__ = es_index

    def logerr(self,msg):
        logging.error("%s; %s\n%s",time.strftime("%Y-%m-%d %H:%M:%S",time.localtime()),msg,pp.pformat(traceback.format_list(traceback.extract_stack())))

    def slow_query_log(self,t0,t1,isPrint=0,message="",query="",index="",doc_type="",tmout=__slow_query__):
        '''
        prints slow query information if necessary
        if isPrint then always print query
        '''
        if isPrint or ((tmout>0) and (t1 - t0 > tmout)):
            logging.info("%s; %s\n%s; index: %s; type: %s;\nslow query: %s;\nexec-time=%f;"
                         ,time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())
                         ,pp.pformat(traceback.format_list(traceback.extract_stack()))
                         ,message
                         ,index,doc_type
                         ,query,t1-t0)

    def create_index(self, mappings):
        ''' Creates a new index using the provided mapping '''
        try:
            num_nodes = self.es.cluster.health()["number_of_data_nodes"]
            settings = {
                "settings": {
                    "index": {
                        "number_of_replicas": 0,
                        "number_of_shards": num_nodes,
                        "max_result_window": 50000
                    }
                }
            }
            settings.update(mappings)
            #print("Creating index: %s;",{"index":self.__es_index__,"body":str(settings)}) #debug
            logging.info("Creating index: %s;",{"index":self.__es_index__,"body":str(settings)}) #debug
	    result = self.es.indices.create(
                index=self.__es_index__,
                body=settings)
            return result
        except Exception as e:
            self.logerr(str(e))
	    #logging.info("Index %s already exists", self.__es_index__)
            # In case the index exists, attempt to create only the doc type
	    x={}
            if not self.exists_type():
                #logging.info("Creating document type %s;\n%s;", self.__es_doc_type__,pp.pformat(traceback.format_list(traceback.extract_stack())))
                logging.info("Creating document type %s;", self.__es_doc_type__)
                try:
		    doc_type = self.get_doc_type()
	            x=self.put_mapping(mappings["mappings"][doc_type])
        	except Exception as e:
	            self.logerr(str(e))
            return x

    def init_host(self, host=None, port=None, http_auth=None, timeout=None, use_ssl=False):
        ''' Applies the Elastic search connection settings '''
        if not timeout:
            timeout = TIMEOUT 
        __es_id__ = 0  # reset ID count cause host changed.
        self.es = Elasticsearch(
            [host],
            port=port,
            use_ssl=use_ssl,
            http_auth=http_auth,
            timeout=timeout
        )

    def delete_index(self):
        ''' Deletes the index associated with this instance '''
        try:
            logging.info("delete_inde; %s;",{"index":self.__es_index__}) #debug
            self.es.indices.delete(index=self.__es_index__)
        #except TransportError as error:
        except Exception as error:
            self.logerr("Noncritical; "+str(error))
	    pass

    def default_time(self, obj):
        """Default JSON serializer."""
        import calendar

        if isinstance(obj, datetime):
            if obj.utcoffset() is not None:
                obj = obj - obj.utcoffset()
        millis = int(
            calendar.timegm(obj.timetuple()) * 1000 +
            obj.microsecond / 1000
        )
        return millis

    def submit_to_es(self, record_to_insert):
        '''
        Adds a record to the Elastic search index
        '''
        self.__es_id__ += 1
        t0 = time.time()
        try:
            res = self.es.index(
                index=self.__es_index__,
                doc_type=self.__es_doc_type__,
                body=record_to_insert)
        finally:
	    self.slow_query_log(t0,time.time(),query=record_to_insert)
        return res

    def submit_bulk_to_es(self, records_to_insert):
        '''
        Adds a group of records to the Elastic search index
        '''
        self.__es_id__ += len(records_to_insert) / 2
	##debug
        #self.__es_id__ += len(records_to_insert) / 2
        #if time.time()-self.__t0__ > 1.0:
        #    self.__t0__ = time.time()
        #    logging.info("submit_bulk_to_es(); t=%f; n=%d; tot=%d"
        #                 ,self.__t0__-self.__tb__,len(records_to_insert)
        #                 ,self.__es_id__)
        ##debug
	t0 = time.time()
        res = {}
	try:
       	    res = self.es.bulk(
       	        body=records_to_insert,
       	        index=self.__es_index__,
       	        doc_type=self.__es_doc_type__,
       	        request_timeout=TIMEOUT)
        except Exception as e:
               self.logerr({"error":str(e),"index":self.__es_index__,"doc_type":self.__es_doc_type__
                           ,"body":["records_to_insert ..."],"nrecs":str(len(records_to_insert)/2)})
        finally:
            self.slow_query_log(t0,time.time(),index=self.__es_index__
                               ,doc_type=self.__es_doc_type__
                               ,query="len(records_to_insert)="+str(int(len(records_to_insert) / 2))+";")
            if res["errors"]:
                try:
                    errors = [
                        item for item in res["items"]
                        if "error" in item["create"].keys()]
                except KeyError as e:
                    errors = [
                        item for item in res["items"]
                        if "error" in item["index"].keys()]
                    logging.error("The following error(s) occurred during indexing: "+str(e))
                    for line in json.dumps(errors, indent=2).split('\n'):
                       logging.error(line)
        return res

    def get_id(self):
        ''' __es_id__ is not being used at this time '''
        return self.__es_id__

    def get_index(self):
        ''' Returns the index being written to '''
        return self.__es_index__

    def get_doc_type(self):
        ''' Returns the document type associated with this instance '''
        return self.__es_doc_type__

    def get_mappings(self, index=None):
        '''
        returns the mappings of a given index, defaults to the one
        associated with this object
        '''
        if not index:
            index = self.__es_index__
        return self.es.indices.get_mapping(index)

    def count(self, query):
        ''' Performs an index search '''
        t0 = time.time()
        try:
            res = self.es.count(
                index=self.__es_index__,
                doc_type=self.__es_doc_type__,
                body={'query': query})
        finally:
            self.slow_query_log(t0,time.time())
        return res

    def raw_search(self, query):
        ''' Performs an index search, expects the complete query as an input '''
        t0 = time.time()
        res={}
        try:
            #logging.info("idx=%s; tp=%s; %s;",self.__es_index__,self.__es_doc_type__,query) #debug
            res = self.es.search(
                index=self.__es_index__,
                doc_type=self.__es_doc_type__,
                body=query)
       	except Exception as e:
	    self.logerr({"error":str(e),"index":es_index,"doc_type":self.__es_doc_type__,"body":query})
            pass
        finally:
            self.slow_query_log(t0,time.time(),index=self.__es_index__
                               ,query=query,doc_type=self.__es_doc_type__)
        return res

    def search(self, query):
        ''' Performs an index search '''
        return self.raw_search({'query': query})

    def global_raw_search(self, es_index, query):
        ''' Allows searching an index other than the registered '''
        t0 = time.time()
        res={}
        try:
            res = self.es.search(
                index=es_index,
                body=query
            )
        except Exception as e:
	    self.logerr({"error":str(e),"index":es_index,"body":query})
            pass
        finally:
            self.slow_query_log(t0,time.time(),index=es_index,query=query)
        return res

    def global_search(self, es_index, query):
        ''' Allows searching an index other than the registered '''
	return self.global_raw_search(es_index, {'query': query})

    def refresh_index(self):
        ''' Refreshes the index associated with this instance '''
        t0 = time.time()
        try:
            self.es.indices.refresh(index=self.__es_index__)
        except TransportError as error:
        #except TransportError as error:
            self.logerr(str(error))
        finally:
            self.slow_query_log(t0,time.time())

    def put_mapping(self, mappings):
        ''' Updates the index mappings '''
        self.es.indices.put_mapping(
            index=self.__es_index__,
            doc_type=self.__es_doc_type__,
            body=mappings)

    def exists(self, index_name):
        ''' Checks whether an index exists '''
        return self.es.indices.exists(index_name)

    def exists_index(self):
        '''
        Checks whether the index associated with the current object exists
        '''
        return self.exists(self.__es_index__)

    def exists_type(self, index_name=None, doc_type_name=None):
        if not index_name:
            index_name = self.__es_index__
        if not doc_type_name:
            doc_type_name = self.__es_doc_type__
        return self.es.indices.exists_type(
            index=index_name,
            doc_type=doc_type_name
        )

    def scan(self, search_query, scroll_time=None, timeout_period=None):
        ''' Returns an iterator object for the whole result set '''
        if not scroll_time:
            scroll_time = "30m"
        if not timeout_period:
            timeout_period = "15m"
        t0 = time.time()
        # print("xxselect",search_query) #debug
        # logging.info("xxselect; %s;",search_query) #debug
        try:
            rc = helpers.scan(
                client=self.es,
                index=self.__es_index__,
                doc_type=self.__es_doc_type__,
                query=search_query,
                scroll=scroll_time,
                timeout=timeout_period)
        finally:
            self.slow_query_log(t0,time.time(),message="xxselect",index=self.__es_index__
                                ,query=search_query,tmout=1.0)
            return rc

    def put_settings(self, body=None):
        ''' Applies the specified index settings '''
        if not isinstance(body, dict):
            return False

        return self.es.indices.put_settings(
            index=self.__es_index__,
            body={"index": body}
        )["acknowledged"]

    def forcemerge(self):
        ''' Wrapper function for es.indices.forcemerge '''

        result = self.es.indices.forcemerge(index=self.__es_index__, request_timeout=120)

        return result["_shards"]["successful"] == result["_shards"]["total"]

    def test(self):

        res = self.es.get(
            index=self.__es_index__,
            doc_type=self.__es_doc_type__,
            id=1)
        print res['_source']

        res = self.es.search(
            index=self.__es_index__,
            doc_type=self.__es_doc_type__,
            body={
                'query': {
                    'range': {
                        'PR': {
                            'from': '0.25',
                            'to': '0.35'}}}})
        print res

    def delete_record(self, record):
        try:
            self.es.delete(
                index=self.__es_index__,
                doc_type=self.__es_doc_type__,
                id=record["_id"]
            )
        #except (KeyError, NotFoundError):
        except Exception:
            self.logerr("")

    def create_alias(self, alias_name, index_name=None):
        ''' Creates or updates and alias with the given index '''
        if not index_name:
            index_name = self.__es_index__
        return self.es.indices.put_alias(name=alias_name, index=index_name)

##############################################
######  TESTS             ####################
##############################################

import unittest


class EsUtilsTests(unittest.TestCase):

    es_tools = ElasticSearchTools("estest", "estest_index")
    es_tools.init_host(host="localhost", port=9200)

    indexCmd = {"index": {"_index": "estest_index", "_type": "estest"}}
    doc = {
        'user': 'arisetyo',
        'message':
            'ini ceritanya tweet yang mau di-index.' +
            'buat di-search entar broh..',
        'postDate': es_tools.default_time(
            datetime(
                2013,
                0o1,
                0o6,
                10,
                25,
                10))}
    doc2 = {
        'user': 'arisetyo2',
        'message':
            'ini ceritanya tweet2 yang mau di-index.' +
            ' buat di-search entar broh..',
        'postDate': es_tools.default_time(
            datetime(
                2014,
                0o2,
                0o6,
                11,
                25,
                10))}
    doc3 = {
        'user': 'arisetyo3',
        'message':
            'ini ceritanya tweet3 yang mau di-index.' +
            ' buat di-search entar broh..',
        'postDate': es_tools.default_time(
            datetime(
                2014,
                0o3,
                0o6,
                12,
                25,
                10))}
    doc4 = {
        'user': 'arisetyo4',
        'message':
            'ini ceritanya tweet4 yang mau di-index.' +
            ' buat di-search entar broh..',
        'postDate': es_tools.default_time(
            datetime(
                2014,
                0o4,
                0o6,
                13,
                25,
                10))}
    doc5 = {
        'user': 'arisetyo5',
        'message':
            'ini ceritanya tweet5 yang mau di-index.' +
            ' buat di-search entar broh..',
        'postDate': es_tools.default_time(
            datetime(
                2014,
                0o5,
                0o6,
                14,
                25,
                10))}
    doc6 = {
        'user': 'arisetyo',
        'message':
            'ini ceritanya tweet6 yang mau di-index.' +
            ' buat di-search entar broh..',
        'postDate': es_tools.default_time(
            datetime(
                2014,
                0o6,
                0o6,
                15,
                25,
                10))}

    def test_import(self):

        # logging.basicConfig(filename='../../logs/test.log',level=logging.INFO)
        logging.basicConfig(
            format='%(levelname)s:%(message)s',
            level=logging.DEBUG)

        self.es_tools.delete_index()

        # datetime doesn't seam to conver to json nicely.  Converted to
        # miliseconds but shoudl be able to handle it....
        self.es_tools.submit_to_es(self.doc)
        self.es_tools.submit_to_es(self.doc2)
        self.es_tools.refresh_index()
        results = self.es_tools.search({'match': {'user': 'arisetyo2'}})
        hits = results['hits']['total']
        logging.info("hits: %s ", hits)
        self.failUnless(results['hits']['total'] == 1)

    def test_bulk_import(self):
        logging.basicConfig(
            format='%(levelname)s:%(message)s',
            level=logging.DEBUG)

        self.es_tools.delete_index()

        records_to_test = [
            self.indexCmd,
            self.doc,
            self.indexCmd,
            self.doc2,
            self.indexCmd,
            self.doc3,
            self.indexCmd,
            self.doc4,
            self.indexCmd,
            self.doc5,
            self.indexCmd,
            self.doc6]
        self.es_tools.submit_bulk_to_es(records_to_test)
        self.es_tools.refresh_index()
        results = self.es_tools.search({'match': {'user': 'arisetyo'}})
        self.failUnless(results['hits']['total'] == 2)


def main():
    ''' Runs the unit tests '''
    unittest.main()

if __name__ == '__main__':
    main()
