
import logging
import argparse
import sys
from tree_analysis_loader import TreeAnalysisIndexLoader
from tree_yaml_data import TreeYamlData
from tree_loader import TreeLoader
from segs_loader import SegsLoader

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


def load_analysis_entry(args, yaml_data):
    logging.info("LOADING TREE ANALYSIS ENTRY")
    analysis_loader = TreeAnalysisIndexLoader(
        host=args.host,
        port=args.port
    )
    record = yaml_data.get_analysis_entry("TREE_CELLSCAPE")
    analysis_loader.import_file(record)
    logging.info("Tree analysis entry loaded")


def load_tree_data(args, yaml_data):
    logging.info("")
    logging.info("LOADING TREE DATA")
    index_name = yaml_data.get_index_name("tree")

    tree_loader = TreeLoader(
        es_doc_type=index_name,
        es_index=index_name,
        es_host=args.host,
        es_port=args.port
    )

    tree_loader.load_file(
        analysis_file=yaml_data.get_file_paths("tree"),
        ordering_file=yaml_data.get_file_paths("tree_order")
    )

def load_segs_data(args, yaml_data):
    logging.info("")
    logging.info("LOADING SEGS DATA")
    index_name = yaml_data.get_index_name("segs")

    segs_loader = SegsLoader(
        es_doc_type=index_name,
        es_index=index_name,
        es_host=args.host,
        es_port=args.port
    )

    seg_files = yaml_data.get_file_paths("segs")

    if segs_loader.es_tools.exists_index():
        logging.info('Seg data for analysis already exists - will delete old index')
        segs_loader.es_tools.delete_index()

    for seg_file in seg_files:
        segs_loader.load_file(
            analysis_file=seg_file
        )


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
        '-y',
        '--yaml_file',
        dest='yaml_file',
        action='store',
        help='Configuration file in Yaml format',
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

def main():
    args = get_args()
    _set_logger_config(args.verbosity)
    yaml_data = TreeYamlData(args.yaml_file)
    load_analysis_entry(args, yaml_data)
    load_tree_data(args, yaml_data)
    load_segs_data(args, yaml_data)



if __name__ == '__main__':
    main()
