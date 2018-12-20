---
id: load-segments
title: Loader: Segments
sidebar_label: Segments
---

## About the data

Segments are a collapsed representation of reads, where consecutive reads that have the same chromosome and state are merged together. This data is used to render the heatmap in Lyra.

## Segments Loader

The segment loader can take a list of inputs.

```yaml
files:
  h5:
    - base: /exact/path/to/h5_with_segs.h5
      segs: path/in/h5/to/segs
  segs:
    - /exact/path/to/segs_01.csv
    - /exact/path/to/segs_02.csv
    - /exact/path/to/segs_03.csv
```

## Required Columns

- cell_id = a unique cell identifier
- chr = chromosome number
- start = segment start coordinate
- end = segment end coordinate
- state = integer value of copy number state (e.g. 0, 1, 2, ...)

## Assumptions

- Each cell_id maps to a leaf node in the tree

## Support for CSV or h5

Each file is either comma-separated or an h5 table. Each row corresponds to a predicted copy number segment and each column corresponds to an attribute of that segment.

Currently assumes that each h5 file only has one table to load.
