---
id: load-bins
title: Loader: Bins
sidebar_label: Bins
---

## About the data

Reads (aka bins) are short, fixed-width genomic regions as part of the output of HMMcopy, which has been modified for single cell copy number prediction as described in Zahn et al., 2017.

## Bins Loader

The bins loader can take a list of inputs.

```yaml
files:
  h5:
    - base: /exact/path/to/h5_with_bins.h5
      bins: path/in/h5/to/bins
  bins:
    - /exact/path/to/bins_01.csv
    - /exact/path/to/bins_02.csv
    - /exact/path/to/bins_03.csv
```

## Required Columns

- cell_id = a unique cell identifier
- chr = chromosome number
- start = segment start coordinate
- end = segment end coordinate
- width = number of bases of that bin
- state = integer value of copy number state (e.g. 0, 1, 2, ...)

## Assumptions

- Each cell_id maps to a leaf node in the tree

## Support for CSV or h5

Each file is either comma-separated or an h5 table. Each row corresponds to a predicted copy number read and each column corresponds to an attribute of that read.

Currently assumes that each h5 file only has one table to load.

## Normalizing to copy number mode

To support [diff by most common copy number](us-heatmap.md#diff-by-most-common-copy-number), the normalized copy number profile of each cell is automatically pre-processed after bin data is loaded. We calculate the mode state for each genomic region, giving us a mode copy number profile. The profile's state is then diff'd against each cell's profile, and then collapsed as a segment representation before being loaded into a separate index.
