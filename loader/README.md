# Montage Loading - Tree Cellscape

These instructions will show an example of the files needed and how to load those files for the tree cellscape dashboard on Montage.

## Input Files

### Analysis YAML

This file contains the metadata for the overall analysis. For example:

```
analysis_id:  <ANALYSIS_ID>
jira_id:      <JIRA_ID>
library_id:   <LIBRARY_ID>
description:  <DESCRIPTION>
type: "tree"
files:
  tree: /exact/path/to/rooted_tree.gml
  tree_order: /exact/path/to/tree_order.tsv
  segs:
    - /exact/path/to/segs_01.csv
    - /exact/path/to/segs_02.csv
    - /exact/path/to/segs_03.csv
```

* analysis_id = unique identifier for analysis
* jira_id = JIRA ticket identifier associated with analysis
* library_id = identifier for chip used in analysis
* description = brief outline of sample
* type = "tree" for tree Cellscape
* files = exact paths to other input files

### Tree Data (GML)

Contains all the necessary data to draw the tree.

Requirements:

* Must have only one root
* Each node must be uniquely labelled
* Must be directed

### Tree Children Ordering (tsv)

Each row corresponds to a parent and an array of children, where the children are ordered according to the top-to-bottom ordering in the heatmap.

Required columns:

* target = ID of parent node (must match a node in the GML file)
* sources = array of IDs corresponding to children of target (must match nodes in GML file)

### Copy Number Segments (csv)

Each row corresponds to a predicted copy number segment and each column corresponds to an attribute of that segment. Montage works with the output of HMMcopy, which has been modified for single cell copy number prediction as described in Zahn et al., 2017.

Required columns:

* cell_id = a unique cell identifier
* chr = chromosome number
* start = segment start coordinate
* end = segment end cooridnate
* integer_median = median copy number value for the segment
* state = integer value of copy number state (e.g. 0, 1, 2, ...)

You can input as many copy number segment files as necessary for the tree.

## Loading Data

1. Make sure the required virtual environment and dependencies are installed.

```
virtualenv ~/pythonenv
source ~/pythonenv/bin/activate
pip install -r <DIRECTORY>/install/pip-requires.txt
```

2. Run the main loader, which will load all the data according to the exact paths within the YAML file

```
python tree_cellscape_loader.py -y /exact/path/to/analysis_metadata_yaml.yaml
```
