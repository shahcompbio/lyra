---
id: graphql-query
title: GraphQL: Queries
sidebar_label: Queries
---

## Dashboard and Analysis

### dashboards

_dashboards: [Dashboard!]!_

- Input: none
- Output: Data on all dashboards

### analysis

_analysis(analysis: String!, dashboard: String!): Analysis_

- Input:
  - analysis: analysis ID
  - dashboard: ID of dashboard
- Output: Data related to analysis

## Tree

### treeRoot

_treeRoot(analysis: String!): Node_

- Input:
  - analysis: analysis ID
- Output: Data on the tree root

### treeNode

_treeNode(analysis: String!, id: [String!], index: Int): Node_

- Input:
  - analysis: analysis ID
  - id: cell ID of node
  - index: heatmap index of node
- Output: data on node with id or at index

### treeNodes

_treeNodes(analysis: String!, range: [Int!]!): [Node]_

- Input:
  - analysis: analysis ID
  - range: [Int, Int] - min and max heatmap range (inclusive) of nodes
- Output: data on all nodes within (and including) range

## Segments

### chromosomes

_chromosomes(analysis: String!): [Chromosome]_

- Input:
  - analysis: analysis ID
- Output: all chromosomes in analysis

### segs

_segs(analysis: String!, indices: [Int!]!, isNorm: Boolean!): [SegRow]_

- Input:
  - analysis: analysis ID
  - indices: list of all heatmap indices to get copy number data for
  - isNorm: whether normalized data by common copy number profile is needed
- Output: segment row data for each index in indices

### modeSegs

_modeSegs(analysis: String!): [Seg]_

- Input:
  - analysis: analysis ID
- Output: normalized data (by common copy number profile) for all rows

### cloneSegs

_cloneSegs(analysis: String!, range: [Int!]!): [Seg]_

- Input:
  - analysis: analysis ID
  - range: [Int, Int] - range of heatmap indices (inclusive) to collapse together into a clone
- Output: clone segment data - summary of copy number data of all indices in range (inclusive)

## Metrics

### hasPloidy

_hasPloidy(analysis: String!): Boolean_

- Input:
  - analysis: analysis ID
- Output: whether analysis has ploidy information

### hasDiffs

_hasDiffs(analysis: String!): Boolean_

- Input:
  - analysis: analysis ID
- Output: whether analysis has normalized copy number (by common copy number profile) data
