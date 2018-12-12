---
id: us-tree
title: User Stories: Tree
sidebar_label: Tree
---

## Summary Tree

As a user, I want to initially see an overview of the tree grouped by branch length, to see overall patterns.

- Tree loads collapse internal nodes if only has one child that is also an internal node (add branch lengths, IDs together)
- Clustering algorithm on front end to display only nodes that have enough subtree to display

## Zoom In / Out

As a user, I need to zoom down to descendants of the tree when needed, to be able to look at individual cells.

As a user, I need to zoom out back to the original tree when needed, so I can look at different parts of the tree.

## Additional information

As a user, I want to be able to see additional information (ID, accompanying heatmap row) about a node or cluster of nodes when I hover over it.

## Export IDs

As a user, I want a list of all node IDs that are contained in the tree, to use for further analysis
