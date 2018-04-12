import yaml
import logging
import traceback
import argparse
import os
import sys



class TreeYamlData(object):
    def __init__(self, yaml_file_path):
        self.yaml_path = yaml_file_path
        yaml_data = self.parse_yaml_file(yaml_file_path)
        self.yaml_data = yaml_data

    def parse_yaml_file(self, yaml_file):
        '''
        returns a dictionary with parsed data from a yaml input file and
        extracts and adds the run id from the file name
        '''
        if not os.path.isfile(yaml_file):
            return

        input_file = open(yaml_file, 'r')
        file_data = '\n'.join(input_file.readlines())
        input_file.close()

        try:
            yaml_data = yaml.load(file_data)
        except ScannerError:
            logging.error("Error parsing yaml file %s.", yaml_file)
            return {}

        if not isinstance(yaml_data, dict):
            return

        return yaml_data



    def get_index_name(self, type):
        base_index_name = self.yaml_data['analysis_id'].lower()

        if type.lower() == "tree":
            return base_index_name + "_tree"

        elif type.lower() == "segs":
            return base_index_name + "_segs"



    def get_file_paths(self, type):
        files = self.yaml_data['files']

        if type.lower() == "tree":
            return files['tree']

        elif type.lower() == "tree_order":
            return files['tree_order']

        elif type.lower() == "segs":
            return files['segs']


    def get_analysis_entry(self, dashboard):
        record = {
            'analysis_id': self.yaml_data['analysis_id'],
            'title': self.yaml_data['jira_id'],
            'description': self.yaml_data['description'],
            'dashboard': dashboard,
            'tree_index': self.get_index_name("tree"),
            'segs_index': self.get_index_name("segs")
        }

        return record
