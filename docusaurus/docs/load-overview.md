---
id: load-overview
title: Loader: Overview
sidebar_label: Overview
---

Lyra requires:

- [Analysis metadata](load-analysis.md)
- [Tree data](load-tree.md)
- [Segment data](load-segments.md)

You can optionally add:

- [Metrics data](load-metrics.md)
- [Bin data](load-bins.md)

## Loading Command

To load into Lyra, use the following command with your Python virtualenv

```
python tree_cellscape_loader.py -y directory/to/yaml/data_metadata.yaml
```
