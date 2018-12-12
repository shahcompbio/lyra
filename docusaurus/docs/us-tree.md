---
id: us-tree
title: User Stories: Tree
sidebar_label: Tree
---

## Branch Lengths

As a user, I want to see the tree account for branch lengths, as it is important evolutionary information

- Obtain data for branch lengths
- Loader to account for branch lengths
- GraphQL layer to pull necessary data for branch lengths
- Rendering of branch lengths

## Summary Tree

As a user, I want to initially see an overview of the tree grouped by branch length, to see overall patterns.

- Tree loads collapse internal nodes if only has one child that is also an internal node (add branch lengths, IDs together)
- Update clustering algorithm for rendering
  - Andrew recommends: given a count of viewable nodes, we find the subtree with the same root as the given tree such that the subtree has the given node count and the largest total branch length

## Drill In / Out

As a user, I need to drill down to descendants of the tree when needed, to be able to look at individual cells.

As a user, I need to zoom out back to the original tree when needed, so I can look at different parts of the tree.

## Additional information

As a user, I want to be able to see additional information (ID, accompanying heatmap row) about a node when I hover over it.
