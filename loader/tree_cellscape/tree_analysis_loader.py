import yaml
import logging
import traceback
import argparse
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
from utils.es_utils import ElasticSearchTools
from tree_yaml_data import TreeYamlData

class TreeAnalysisIndexLoader(object):
    '''
    Populates published_dashboards_index
    '''
    index_name = "tree_analysis"


    def __init__(self, host, port, use_ssl=False, http_auth=None):
        self.es_tools = ElasticSearchTools(
            es_doc_type=self.index_name,
            es_index=self.index_name
        )
        self.host = host
        self.port = port
        self.use_ssl = use_ssl
        self.http_auth = http_auth

    def import_file(self, record):
        '''
        Imports the imput file contents to the published_dashboards_index in Elasticsearch.
        '''
        try:
            self.es_tools.init_host(
                host=self.host,
                port=self.port,
                http_auth=self.http_auth,
                use_ssl=self.use_ssl)

            # Create index if necessary
            if not self.es_tools.exists(self.index_name):
                logging.info("Creating tree analysis index with name %s", self.index_name)
                self.es_tools.create_index(self.get_mappings())

            self.es_tools.refresh_index()

            # Delete analysis entry if it already exists
            r = self.es_tools.search(self.analysis_record_query(record))
            if r['hits']['total'] > 0:
                logging.info('Duplicate analysis found - deleting old record')
                self.es_tools.delete_record(r['hits']['hits'][0])
                self.es_tools.refresh_index()

            self.es_tools.submit_to_es(record)

        except Exception:
            logging.error(traceback.format_exc(traceback.extract_stack()))
            pass



    def get_mappings(self):
        '''
        Returns the mappings used to perform the file import.
        '''
        document_type = self.es_tools.get_doc_type()
        mappings = {
            "mappings": {
                self.index_name: {
                    "properties": {
                        "title": {
                            "type": "keyword"
                        },
                        "description": {
                            "type": "keyword"
                        },
                        "dashboard": {
                            "type": "keyword"
                        },
                        "analysis_id": {
                            "type": "keyword"
                        }
                    }
                }
            }
        }

        return mappings

    def analysis_record_query(self, record):
        '''
        Returns query to get analysis record
        '''
        query = {
            "bool": {
                "must": [
                    {
                        "term": {
                            "dashboard": {
                                "value": "TREE_CELLSCAPE"
                            }
                        }
                    },
                    {
                        "term": {
                            "analysis_id": {
                                "value": record['analysis_id']
                            }
                        }
                    }
                ]
            }
        }

        return query


def get_args():
    '''
    Argument parser
    '''
    parser = argparse.ArgumentParser(
        description=('Creates an index in Elasticsearch called published_dashboards_index, ' +
        'and loads it with the data contained in the infile.')
    )
    required_arguments = parser.add_argument_group("required arguments")
    required_arguments.add_argument(
        '-y',
        '--yaml_file',
        dest='yaml_file',
        action='store',
        help='Configuration file in Yaml format',
        required=True,
        type=str)
    parser.add_argument(
        '-H',
        '--host',
        default='localhost',
        metavar='Host',
        help='The Elastic search server hostname.')
    parser.add_argument(
        '-p',
        '--port',
        default=9200,
        metavar='Port',
        help='The Elastic search server port.')
    parser.add_argument(
        '--use-ssl',
        dest='use_ssl',
        action='store_true',
        help='Connect over SSL',
        default=False)
    parser.add_argument(
        '-u',
        '--username',
        dest='username',
        help='Username')
    parser.add_argument(
        '-P',
        '--password',
        dest='password',
        help='Password')
    parser.add_argument(
        '-v',
        '--verbosity',
        dest='verbosity',
        action='store',
        help='Default level of verbosity is INFO.',
        choices=['info', 'debug', 'warn', 'error'],
        type=str,
        default="info")
    return parser.parse_args()


def _set_logger_config(verbosity=None):
    # Set logging to console, default verbosity to INFO.
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    logging.basicConfig(
        format='%(levelname)s: %(message)s',
        stream=sys.stdout
    )

    if verbosity:
        if verbosity.lower() == "debug":
            logger.setLevel(logging.DEBUG)

        elif verbosity.lower() == "warn":
            logger.setLevel(logging.WARN)

        elif verbosity.lower() == "error":
            logger.setLevel(logging.ERROR)


def main():
    ''' main function '''
    args = get_args()
    http_auth = None
    if args.username and args.password:
        http_auth = (args.username, args.password)
    try:

        _set_logger_config(args.verbosity)
        loader = TreeAnalysisIndexLoader(
        args.host,
        args.port,
        use_ssl=args.use_ssl,
        http_auth=http_auth)


        yaml_data = TreeYamlData(args.yaml_file)
        record = yaml_data.get_analysis_entry("TREE_CELLSCAPE")

        loader.import_file(record)
    except Exception:
        logging.error(traceback.format_exc(traceback.extract_stack()))
    pass

if __name__ == '__main__':
    main()
