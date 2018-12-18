---
id: load-tree
title: Loader: Tree
sidebar_label: Tree
---

## Compression of internal nodes

We assume that internal nodes contain some non-cell information, and that cells are represented by the leaves of the tree. In some tree algorithms, there are long branches where each internal node only has one child, and that child is also an internal node. Our loader collapses these kinds of nodes together.

- IDs are merged together as one long string, separated by commas
- Branch lengths are added together
