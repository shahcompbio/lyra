'''
Created on April 2014
 snipped from /biomart/functions.py
@author: klc

Simple file hadling functions

#TODO: Modulize this.  Turn into a class.



'''

import os
import re
import csv
from datetime import date


class MissingInformation(Exception):

    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value)


def getFileInfo(filePath):
    # regex statements
    findBuild = '(_)([a-z]{2}\d{1,2})(_)'
    findRunId = '(run|RR|RG)(\d+)'

    info = {}

    # get the experiment type
    expt_type = re.search('wgss|excap', filePath)
    if expt_type:
        info['expt_type'] = expt_type.group(0).upper()
    else:
        info['expt_type'] = None

    # get the run id
    runID = re.search(findRunId, filePath).group(0)
    if runID:
        info['run_id'] = runID
    else:
        raise MissingInformation(
            'This file name: ' +
            filePath +
            ' is not properly formatted. It is missing the run ID. Please see the documentation for this script (on the Wiki) for further information.')

    # get the genome build
    build = re.search(findBuild, filePath).group(2)
    if build:
        info['build'] = build
    else:
        raise MissingInformation(
            'This file name: ' +
            filePath +
            ' is not properly formatted. It is missing the genome build. Please see the documentation for this script (on the Wiki) for further information.')

    return info

# Logs a file entered into the database in the filesEntered.tsv file
#@param - fileName - the full path of the file entered into the database
#@param - fileType - the type of the file entered


def logEnteredFile(fileName, fileType):
    # open the log file
    logFile = '/Users/xren/moncodb/data/filesEntered.tsv'
    fOut = open(logFile, 'a')

    # create the CSV file writer
    writer = csv.writer(fOut, delimiter='\t', quoting=csv.QUOTE_MINIMAL)

    # add the header if it's not already there
    if os.path.getsize(logFile) <= 0:
        writer.writerow(['File Name', 'File Type', 'Date Entered'])

    writer.writerow([fileName, fileType, date.today().strftime('%m-%d-%Y')])

# Returns a list of file paths. What is returned depends on what the input path is (see below).
#@param - path: string - a full file path to one of the following:
# 1. a file
# 2. a directory containing files (no subdirectories allowed)
# 3. a file containing a list of full file paths to files
#@return - list - the full file paths for all files


def getFileList(path):
    # if the path is for a directory, return all the files in the directory
    if os.path.isdir(path):
        filePaths = []
        for root, _, files in os.walk(path):
            for f in files:
                filePaths.append(os.path.join(root, f))
        return filePaths

    # if the path is for a file
    else:
        # open file to see if it is an analysis or list of files
        f = open(path, 'r')
        line = f.readline().strip()
        if re.match('(/[A-Za-z0-9_]+)+\.[A-Za-z]+', line):
            # the file contains a list of files
            f.seek(0, 0)
            filePaths = f.readlines()
            filePaths = [i.strip() for i in filePaths]
            return filePaths
        else:
            # the file is a single analysis
            return [path]
        f.close()
