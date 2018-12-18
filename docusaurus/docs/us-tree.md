---
id: us-tree
title: User Stories: Tree
sidebar_label: Tree
---

## Summary Tree

As a user, I want to initially see an overview of the tree grouped by branch length, to see overall patterns.

- [[VIZ-105](https://shahcompbio.atlassian.net/browse/VIZ-105)] Tree loads collapse internal nodes if only has one child that is also an internal node (add branch lengths, IDs together)
  - [[VIZ-144](https://shahcompbio.atlassian.net/browse/VIZ-144)] Update GraphQL layer to so that ID field for trees is array (instead of string)
  - [[VIZ-145](https://shahcompbio.atlassian.net/browse/VIZ-145)] Update front end to accept array of strings instead of a single string for tree ID
- Clustering algorithm on front end to display only nodes that have enough subtree to display

## Zoom In / Out

As a user, I need to zoom down to descendants of the tree when needed, to be able to look at individual cells.

As a user, I need to zoom out back to the original tree when needed, so I can look at different parts of the tree.

## Additional information

As a user, I want to be able to see additional information (ID, accompanying heatmap row) about a node or cluster of nodes when I hover over it.

## Export IDs

As a user, I want a list of all node IDs that are contained in the tree, to use for further analysis
