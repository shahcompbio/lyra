'''
Generic parser/indexer for analysis results in csv file format

Created on October 28, 2015

@author: dmachev
'''

import csv
import ast
import re
import copy
import logging
import argparse
import os
import sys
import math
import __builtin__
import networkx as nx
from utils.analysis_loader import AnalysisLoader


class TreeLoader(AnalysisLoader):

    ''' Class TreeLoader '''

    __index_buffer__ = []

    def __init__(
            self,
            es_doc_type=None,
            es_index=None,
            es_host=None,
            es_port=None,
            use_ssl=False,
            http_auth=None,
            timeout=None):
        super(TreeLoader, self).__init__(
            es_doc_type=es_doc_type,
            es_index=es_index,
            es_host=es_host,
            es_port=es_port,
            use_ssl=use_ssl,
            http_auth=http_auth,
            timeout=timeout)

    def load_file(self, analysis_file=None, ordering_file=None):
        if self.es_tools.exists_index():
            logging.info('Tree data for analysis already exists - will delete old index')
            self.es_tools.delete_index()

        self.create_index()

        self.disable_index_refresh()
        tree = nx.read_gml(analysis_file)
        ordering = self._get_tree_ordering(ordering_file)

        self._load_tree_data(tree, ordering)

        self.enable_index_refresh()

    def _get_tree_ordering(self, ordering_file):

        ordering = {}

        with open(ordering_file) as tsv_in:
            tsv_in = csv.reader(tsv_in, delimiter='\t')

            for row in tsv_in:
                ordering[row[0].strip()] = [child.strip() for child in row[1].split(',')]

        return ordering

    def _load_tree_data(self, tree, ordering):

        all_nodes = list(tree.nodes)
        [tree_root] = [n for n in all_nodes if tree.in_degree(n)==0]

        todo_list = [[tree_root, 'root']]
        heatmap_index = 0


        def _count_descendents(self, node):
            try:
                descendent_count = len(nx.descendants(tree, node)) + 1
                return descendent_count
            except KeyError:
                return 0

        while todo_list != []:
            [curr_node, curr_parent] = todo_list.pop(0)

            try:
                curr_children = ordering[curr_node]
                #curr_children.sort(key=_count_descendents)

                num_successors = len(nx.descendants(tree, curr_node))

                index_record = {
                    'heatmap_order': heatmap_index,
                    'cell_id': curr_node,
                    'parent': curr_parent,
                    'children': curr_children,
                    'max_height': self._get_max_height_from_node(tree, curr_node),
                    'min_index': heatmap_index,
                    'max_index': heatmap_index + num_successors
                }

                self._buffer_record(index_record, False)
                todo_list = [[child, curr_node] for child in curr_children] + todo_list


            except KeyError: #is leaf node
                curr_children = []
                index_record = {
                    'heatmap_order': heatmap_index,
                    'cell_id': curr_node,
                    'parent': curr_parent,
                    'children': [],
                    'num_successors': 0,
                    'max_height': 0,
                    'min_index': heatmap_index,
                    'max_index': heatmap_index
                }
                self._buffer_record(index_record, False)


            heatmap_index += 1
            logging.debug(index_record)

        # Submit any records remaining in the buffer for indexing
        self._buffer_record(None, True)




    def _get_max_height_from_node(self, tree, node):
        try:
            path_lengths = nx.shortest_path_length(tree, source=node)
            node_with_longest_path = max(path_lengths.keys(), key=lambda key: path_lengths[key])

            return path_lengths[node_with_longest_path]
        except KeyError:
            return 0



    def _buffer_record(self, index_record, empty_buffer=False):
        '''
        Appends records to the buffer and submits them for indexing
        '''
        if isinstance(index_record, dict):
            index_cmd = self.get_index_cmd()
            self.__index_buffer__.append(index_cmd)
            self.__index_buffer__.append(index_record)

        if len(self.__index_buffer__) >= self.LOAD_FACTOR or empty_buffer:
            self.es_tools.submit_bulk_to_es(self.__index_buffer__)
            self.__index_buffer__ = []



def get_args():
    '''
    Argument parser
    '''
    parser = argparse.ArgumentParser(
        description=('Creates an index in Elasticsearch called published_dashboards_index, ' +
                     'and loads it with the data contained in the infile.')
    )
    required_arguments = parser.add_argument_group("required arguments")
    parser.add_argument(
        '-i',
        '--index',
        dest='index',
        action='store',
        help='Index name',
        type=str)
    parser.add_argument(
        '-g',
        '--gml_file',
        dest='gml_file',
        action='store',
        help='Tree data file',
        type=str)
    parser.add_argument(
        '-or',
        '--ordering_file',
        dest='ordering_file',
        action='store',
        help='Ordering file for tree',
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
    args = get_args()
    _set_logger_config(args.verbosity)
    es_loader = TreeLoader(
        es_doc_type=args.index,
        es_index=args.index,
        es_host=args.host,
        es_port=args.port)

    es_loader.load_file(analysis_file=args.gml_file, ordering_file=args.ordering_file)




if __name__ == '__main__':
    main()
