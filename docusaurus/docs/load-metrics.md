---
id: load-metrics
title: Loader: Metrics
sidebar_label: Metrics
---

## About the data

Metrics are QC-related metrics, part of the output of HMMcopy, which has been modified for single cell copy number prediction as described in Zahn et al., 2017.

## Reads Loader

The metrics loader can take a list of inputs.

```yaml
files:
  h5:
    - base: /exact/path/to/h5_with_metrics.h5
      metrics: path/in/h5/to/metrics
  metrics:
    - /exact/path/to/metrics_01.csv
    - /exact/path/to/metrics_02.csv
    - /exact/path/to/metrics_03.csv
```

## Required Columns

- cell_id = a unique cell identifier
- state_mode = mode of state (related to bins), used for ploidy state

## Assumptions

- Each cell_id maps to a leaf node in the tree

## Support for CSV or h5

Each file is either comma-separated or an h5 table. Each row corresponds to the metrics of a particular cell.

Currently assumes that each h5 file only has one table to load.

## Normalizing to ploidy

Loading metrics data will automatically activate Lyra's [diff by ploidy](us-heatmap.md#diff-by-ploidy) functionality.
