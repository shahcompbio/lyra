---
id: load-tree
title: Loader: Tree
sidebar_label: Tree
---

The tree loader can take in up to four inputs.

```yaml
files:
  tree: /exact/path/to/tree.gml
  tree_order: /exact/path/to/tree_order.tsv
  tree_root: <ROOT_ID>
  tree_edges: /exact/path/to/tree_edges.csv
```

## Tree

A GML or Newick file that contains the nodes and edges for the tree structure.

### Assumptions

- Each node is uniquely labeled with an ID
- Only has one root
- Internal nodes are non-cells
- Leaf nodes are cells

### Options for Tree Rooting

We assume that the tree is rooted. At least one of these must be present to load a rooted tree:

- Original tree file is rooted
- Original tree file is unrooted and tree root ID is provided
- Original tree file is unrooted and tree edges are provided

### Compression of internal nodes

We assume that internal nodes contain some non-cell information, and that cells are represented by the leaves of the tree. In some tree algorithms, there are long branches where each internal node only has one child, and that child is also an internal node. Our loader collapses these kinds of nodes together.

- IDs are merged together as one long string, separated by commas
- Branch lengths are added together

### Ordering of Children

The order of the children of each node in the tree specifies the top-to-bottom row ordering in the accompanying heatmap.

The default ordering is by increasing number of descendants. This can be overridden by providing a tree order file.

## Tree Order

A tab-separated file, where each row corresponds to a parent and an array of children. The children are ordered according to the top-to-bottom ordering in the heatmap.

### Sample file

```tsv
target  sources
NODE1 [NODE2, NODE3]
NODE2 [NODE4]
```

### Required columns

- target = ID of parent node (must match a node in the tree file)
- sources = array of IDs corresponding to children of target (must match nodes in tree file)

## Tree Root

The ID of the root of the tree. This is only needed if the tree file is unrooted. It must correspond to the ID of a node in the tree file.

## Tree Edges

A comma separated file, where each row is an edge from source ID to target ID. Altogether, the tree edges form a tree with exactly one root.
