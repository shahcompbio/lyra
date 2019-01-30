---
id: load-preprocessing
title: Loader: Preprocessing
sidebar_label: Preprocessing
---

Preprocessing is a step done before [loading Newick (tree) data](load-tree.md), in particular for CorruptTree output.

You can enable it when loading by adding `-pp` and `-m` flags to the loading call, like so:

```
python tree_cellscape_loader.py -y directory/to/yaml/data_metadata.yaml -pp -m
```

## -pp

`-pp` will do the following things:

- Root the tree
- Remove the `cell_` prefix from the IDs

## -m

`-m` will remove the branch suffix after the sample ID
