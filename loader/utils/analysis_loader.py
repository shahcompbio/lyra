'''
Created on May 2014
@author: klc

Base class for importing anaysis result files

'''
from __future__ import division
import os
import logging
import re
import copy
from datetime import datetime
from prettytable import PrettyTable
from uuid import uuid4
import file_utils as fx
from es_utils import ElasticSearchTools
from es_settings import HEADER_FIELDS, REFERENCE_INDEX
from es_settings import YAML_INDEX
from elasticsearch.exceptions import NotFoundError


class AnalysisLoader(object):

    '''
    Abstract class, needs to be subclassed for
    each specific data type.
    '''

    LOAD_FACTOR = 4000
    es_tools = {}
    record_attributes = []
    __load_id__ = ''
    __paired_record_attributes__ = None

    #
    # ABSTRACT METHODS TO IMPLEMENT
    #

    def parse_line(self, line):
        '''
        ABSTRACT METHOD
        parses 1 data line.
        returns dictionary of parsed information
        '''

        raise NotImplementedError(
            "Please implement this method when inheriting from this class")

    def parse_header(self, infile_handle, custom_header=None):
        '''
         parses entire header.
         returns dictionary of parsed header information
        '''

        header_values = {}
        if isinstance(custom_header, dict):
            header_values = copy.deepcopy(custom_header)
        header_fields = copy.deepcopy(HEADER_FIELDS['common'])

        # add subclass specific header fields, if any
        if type(self).__name__ in HEADER_FIELDS.keys():
            header_fields = dict(
                header_fields.items() +
                HEADER_FIELDS[type(self).__name__].items()
            )

        for line in infile_handle:
            line = line.strip()
            # Stop parsing when the first non-blank, non-comment line is reached
            if line and not line.startswith("#"):
                break
            # Skip blank lines and comment lines that don't start with two '#'s
            if not line or not re.match(r'^#{2}\w[^#]', line):
                continue
            [key, value] = (re.sub(r'^#+', '', line)).split('=', 1)
            if key in header_fields.keys():
                field = header_fields[key]['field']
                header_values[field] = value
                if header_fields[key]['transform'] == 'lower':
                    header_values[field] = value.lower()
                elif header_fields[key]['transform'] == 'time':
                    try:
                        header_values[field] = datetime.strptime(
                            value, '%Y-%m-%dT%H:%M:%S'
                        )
                    except ValueError:
                        # Check whether the date is in the format returned
                        # by 'date' command, i.e. 'Fri Nov 21 11:35:33 2014'
                        try:
                            header_values[field] = datetime.strptime(
                                value, '%a %b %d %I:%M:%S %Y'
                            )
                        except ValueError:
                            header_values[field] = datetime.strptime(
                                value, '%a %b %d %H:%M:%S %Y'
                            )

                elif header_fields[key]['transform'] == 'number':
                    header_values[field] = self.convert_to_number(value)
                elif header_fields[key]['transform'] == 'remove':
                    del header_values[field]
            else:
                header_values[key] = value

        query_values = {}
        for field in ['sample_id',
                      'normal_sample_id',
                      'library_id',
                      'normal_library_id',
                      'run_id']:
            if field in header_values.keys():
                query_values[field] = header_values[field]

        yaml_data = {}
        project_data = {}

        if 'run_id' in query_values.keys():
            yaml_records = self.get_reference_data(YAML_INDEX, query_values)
            if not yaml_records:
                logging.error("Sample not found in Yaml index.")
            else:
                yaml_data = self.get_yaml_record(
                    yaml_records, infile_handle.name
                )

            del query_values['run_id']
            project_records = self.get_reference_data(
                REFERENCE_INDEX, query_values
            )
            if not project_records:
                logging.error("Sample not found in Sample index.")
            else:
                project_data = project_records[0]['_source']
            if "tumor_type" in project_data.keys():
                project_data["tumor_type"] = project_data["tumor_type"].lower()

        header_values = dict(
            header_values.items() + project_data.items() + yaml_data.items()
        )

        header_values['file_fullname'] = os.path.abspath(infile_handle.name)

        return header_values

    def validate_input_file(self, filename):
        '''
        checks the given filename and makes sure its acceptable to load
        returns true if we should parse the file. False if we should not.
        '''

        raise NotImplementedError(
            "Please implement this method when inheriting from this class")

    def validate_file_content(self, file_path):
        '''
        checks whether the input file contains the expected number of columns by
        examining the first 50 non-comment lines
        '''

        if not self.record_attributes:
            return True

        num_fields = len(self.record_attributes)
        lines_read = 0
        file_is_valid = True

        file_handle = open(file_path, 'r')
        for line in file_handle:
            if line.startswith('#'):
                continue
            lines_read += 1
            if len(line.strip().split('\t')) != num_fields:
                file_is_valid = False
                logging.error(
                    "%s doesn't match the expected input file format.",
                    os.path.basename(file_path))
                break
            if lines_read >= 50:
                break
        file_handle.close()

        return file_is_valid

    def __init__(self, es_doc_type=None,
                 es_index=None, es_host=None,
                 es_port=None, timeout=None,
                 use_ssl=False, http_auth=None):
        '''
        sets up Elastic search connection parameters
        '''
        self.__load_id__ = str(uuid4())
        self.es_tools = ElasticSearchTools(es_doc_type, es_index)
        self.es_tools.init_host(
            host=es_host,
            port=es_port,
            timeout=timeout,
            use_ssl=use_ssl,
            http_auth=http_auth)

    def convert_to_number(self, number):
        '''
        converts strings representing numeric values into the
        corresponding data types
        '''
        try:
            value = int(number)
            return value

        except ValueError:
            try:
                value = float(number)
                return value
            except ValueError as ve2:
                logging.debug(" %s is not a number. error is: %s", number, ve2)
                return None

    def parse(
            self,
            analysis_file=None,
            custom_header=None,
            analysis_data=None):
        '''
        parses a analysis file.
        requires correct header and filename standard
        '''
        # initiate variables
        analysis_values = {}
        header_values = {}
        buffered_values = []
        index_cmd = self.get_index_cmd()
        stats = {'skipped': 0, 'lines_read': 0, 'non_standard_chroms': 0}
        self.disable_index_refresh()

        if not isinstance(custom_header, dict):
            custom_header = {}

        try:

            file_handle = open(analysis_file, 'r')
            header_values = self.parse_header(file_handle, custom_header)
            # Add any user provided data to the header
            if isinstance(custom_header, dict):
                header_values = dict(
                    header_values.items() + custom_header.items()
                )

            # Reposition the handle at the beginning of the file
            file_handle.seek(0)

            # read the records into the intermediate analysis_files
            for line in file_handle:
                stats["lines_read"] += 1

                # Skip lines that begin with a # (ie don't parse comments)
                if stats["lines_read"] == 1 or line.startswith(
                        '#') or line.startswith(' '):
                    stats["skipped"] += 1
                    continue

                parsed_line = self.parse_line(line)
                # line could be empty or line could be an uncommented column
                # header (like titan)
                if not parsed_line:
                    stats["skipped"] += 1
                    continue

                if not isinstance(parsed_line, list):
                    parsed_line = [parsed_line]

                if len(parsed_line) == 2:
                    record_copy = copy.deepcopy(parsed_line[0])
                    parsed_line[0]['paired_record'] = self.__get_paired_record(
                        parsed_line[1])
                    parsed_line[1]["paired_record"] = self.__get_paired_record(
                        record_copy)

                for idx, parsed_line_record in enumerate(parsed_line):
                    if 'chrom_number' in parsed_line_record.keys():
                        chrom_number = str(parsed_line_record['chrom_number'])
                        if re.match(r'^\d{1,2}$', chrom_number):
                            chrom_number = chrom_number.zfill(2)
                        else:
                            chrom_number = chrom_number.upper()
                            if chrom_number not in ['X', 'Y']:
                                stats["non_standard_chroms"] += 1
                                stats["skipped"] += 1
                                # Remove from the buffer any records that are
                                # produced by the line being skipped and that
                                # might have been queueued for indexing
                                if idx:
                                    buffered_values = buffered_values[:-idx*2]
                                break

                        parsed_line_record['chrom_number'] = chrom_number

                    analysis_values = dict(
                        header_values.items() +
                        parsed_line_record.items())
                    analysis_values["source_id"] = self.__load_id__

                    buffered_values.append(index_cmd)
                    buffered_values.append(analysis_values)

                if len(buffered_values) >= self.LOAD_FACTOR:
                    self.es_tools.submit_bulk_to_es(buffered_values)
                    buffered_values = []

            # any leftovers....
            if len(buffered_values) > 0:
                self.es_tools.submit_bulk_to_es(buffered_values)
            file_handle.close()

        except IOError as error:
            logging.warn('IO Error: %s', error)
            logging.warn(
                "NOTE: Load failed. Check logs to verify" +
                " what was actually loaded. ")
            file_handle.close()
        finally:
            self.enable_index_refresh()

        stats['inserted'] = self.es_tools.get_id()
        stats['error'] = ''

        return stats

    def disable_index_refresh(self):
        ''' Temporarily disables index refreshing during bulk indexing '''
        return self.es_tools.put_settings({"refresh_interval": "-1"})

    def enable_index_refresh(self):
        ''' Re-enables index refresh '''
        if self.es_tools.put_settings({"refresh_interval": "1s"}):
            return self.es_tools.forcemerge()
        return False

    def count_input_lines(self, input_file):
        '''
        Counts the number of non-comment lines in an input file
        '''
        num_lines = os.popen(
            'grep -v "^#" ' +
            input_file +
            ' | grep -v "^$" | wc -l').read().split('\n')[0]

        if re.match(r'^\s*\d+$', num_lines):
            return int(num_lines)

        return 0

    def validate_import(self, input_file=None, input_data=None, stats=None):
        '''
        verifies that the expected number of records has been created
        '''

        validated = False
        import_stats = {}

        self.es_tools.refresh_index()

        if not input_file:
            grouping_clause = {'source_id': self.__load_id__}
            num_input_lines = len(input_data)
        else:
            import_stats['file_fullname'] = os.path.abspath(input_file)
            grouping_clause = {'file_fullname': import_stats["file_fullname"]}
            num_input_lines = self.count_input_lines(input_file)

        results = self.es_tools.search({'match': grouping_clause})

        import_stats['index'] = self.es_tools.get_index()
        import_stats['doc_type'] = self.es_tools.get_doc_type()
        import_stats['timestamp'] = datetime.now()
        import_stats['record_count'] = num_input_lines
        # in case import stats have been provided, adjust the count
        # by taking out of consideration any skipped non-standard chromosomes
        if stats:
            import_stats['record_count'] -= stats["non_standard_chroms"]
        import_stats['imported_record_count'] = results['hits']['total']
        import_stats['log'] = ''

        if self.validate_record_number(
                import_stats['record_count'],
                import_stats['imported_record_count']):
            import_stats['log'] = 'All records have been imported.'
            validated = True
        else:
            import_stats['log'] = 'Some records from' +\
                ' this input file have not been imported.'

        # Verify that all imported records do have a sample_id or
        # normal_sample_id field
        filter_query = {
            'filtered': {
                'query': {
                    'match': grouping_clause
                },
                'filter': {
                    'bool': {
                        'must_not': [
                            {
                                'exists': {
                                    'field': 'sample_id'
                                }
                            },
                            {
                                'exists': {
                                    'field': 'normal_sample_id'
                                }
                            }
                        ]
                    }
                }
            }
        }

        results = self.es_tools.search(filter_query)
        if results['hits']['total'] != 0:
            import_stats['log'] += ' ' + str(results['hits']['total']) + \
                ' records do not have sample_id/normal_sample_id attribute.'
            validated = False

        # Verify that there are no records with sample_id or normal_sample_id
        # with value an empty string

        filter_query = {
            'filtered': {
                'query': {
                    'match': grouping_clause
                },
                'filter': {
                    'bool': {
                        'should': [
                            {
                                'terms': {
                                    'sample_id': ['']
                                }
                            },
                            {
                                'terms': {
                                    'normal_sample_id': ['']
                                }
                            }
                        ]
                    }
                }
            }
        }

        results = self.es_tools.search(filter_query)
        if results['hits']['total'] != 0:
            import_stats['log'] += ' ' + str(results['hits']['total']) + \
                ' records have an empty string as a ' +\
                'sample_id/normal_sample_id attribute value.'
            validated = False

        # Verify that all imported records have the following fields -
        # chrom number, start, end, tumor_type, expt_type, project

        for field in ['chrom_number', 'start', 'end', 'caller',
                      'tumor_type', 'expt_type', 'project']:
            filter_query = {
                'filtered': {
                    'query': {
                        'match': grouping_clause
                    },
                    'filter': {
                        'bool': {
                            'must': [
                                {
                                    'exists': {
                                        'field': field
                                    }
                                }
                            ]
                        }
                    }
                }
            }

            results = self.es_tools.search(filter_query)

            total_hits = results['hits']['total']
            if total_hits != import_stats['imported_record_count']:
                error_count = import_stats['imported_record_count'] - \
                    results['hits']['total']
                import_stats['log'] += ' ' + str(error_count) + \
                    ' records are missing field \'' + field + '\'.'
                validated = False

        import_stats['validated'] = validated
        self.record_import_stats(import_stats)

        stats = PrettyTable(['Field', 'Value'])
        stats.padding_width = 1
        stats.max_width['Value'] = 100

        for key in import_stats.keys():
            stats.add_row([key, import_stats[key]])
        stats.align = 'l'

        logging.info(
            "File import results:\n%s", stats
        )

        return validated

    def record_import_stats(self, data):
        '''
        records the per-file import statistics into a
        separate Elastic search index
        '''

        stats_index = 'import_stats_index'
        if not self.es_tools.exists(stats_index):
            from elasticsearch.exceptions import RequestError
            try:
                self.es_tools.es.indices.create(stats_index)
            except RequestError:
                logging.info("% exists.", stats_index)

        res = self.es_tools.es.index('import_stats_index', 'log_type', data)

        return res

    def validate_record_number(self, record_count, imported_count):
        '''
        Some loaders produce several records for each input line,
        such ones should override the function below
        '''

        return record_count == imported_count

    def get_default_mappings(self):
        '''
        returns the default mapping configuration to be used
        when creating a new Elastic search index
        '''

        document_type = self.es_tools.get_doc_type()

        mappings = {
            'mappings': {
                document_type: {
                    "_size": {"enabled": True},
                    "dynamic_templates": [
                        {
                            "string_values": {
                                "match": "*",
                                "match_mapping_type": "string",
                                "mapping": {
                                    "type": "keyword"
                                }
                            }
                        }
                    ]
                }
            }
        }

        return mappings

    def create_index(self, mappings=None):
        '''
        a wrapper method which invokes the corresponding es_utils method.
        If the index exists and the document type doesn't, creates the
        document type only
        '''
        if not mappings:
            mappings = self.get_default_mappings()

        return self.es_tools.create_index(mappings)

    def get_reference_data(self, index, sample_data):
        ''' searches the provided index for sample related data '''
        query = []
        for field in sample_data.keys():
            query.append({'terms': {field: [sample_data[field]]}})

        query = {'bool': {'must': query}}
        try:
            res = self.es_tools.global_search(index, query)
        except NotFoundError:
            logging.error("Index %s doesn't exist.", index)
            return []

        return res["hits"]["hits"]

    def get_yaml_record(self, results, input_file):
        '''
        In case of multiple results, determines and returns the correct one,
        more specific implementations will be added in child classes
        '''
        return results[0]['_source']

    def get_index_cmd(self):
        return {
            "index": {
                "_index": self.es_tools.get_index(),
                "_type": self.es_tools.get_doc_type()
            }
        }

    def __get_paired_record(self, record):
        if isinstance(self.__paired_record_attributes__, list):
            paired_record = {}
            for key in self.__paired_record_attributes__:
                paired_record[key] = copy.deepcopy(record[key])
            return paired_record
        return copy.deepcopy(record)

    def get_source_id(self):
        '''
        Returns the load ID associated with the object
        '''
        return self.__load_id__
