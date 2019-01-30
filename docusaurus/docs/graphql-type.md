---
id: graphql-type
title: GraphQL: Types
sidebar_label: Types
---

## Dashboard

- id: String!
- analyses: [Analysis!]!
  - All analyses under that particular dashboard type

## Analysis

- id: String!
- title: String!
- description: String!
- segsIndex: String!
  - name of the index that segment data is in
- treeIndex: String!
  - name of the index that tree data is in

## Tree Types

### Node

- id: [String!]!
  - all cell IDs of node
- parent: String
  - ID of parent node, null if node is root
- index: Int!
  - heatmap index of node
- maxIndex: Int!
  - largest heatmap index of a descendant rooted at node
- maxHeight: Int!
  - height between node and farthest descendant
- children: [NodeChild!]!

### NodeChild

- id: [String!]!
  - all cell IDs of node
- index: Int!
  - heatmap index of node
- maxIndex: Int!
  - largest heatmap index of a descendant rooted at node
- maxHeight: Int!
  - height between node and farthest descendant

## Segment Types

### Chromosome

- id: String!
  - chromosome number
- start: Int!
  - start position of chromosome in base pairs
- end: Int!
  - end position of chromosome in base pairs

### SegRow

- id: String!
  - cell ID + whether it normalized or not
  - This is done so graphQL doesn't cache the wrong set of data
- name: String!
  - cell ID (displayed name)
- index: Int!
  - heatmap index
- ploidy: Int!
- segs: [Seg!]!

### Seg

- chromosome: String!
  - chromosome number
- start: Int!
  - start position of segment in base pairs
- end: Int!
  - end position of segment in base pairs
- state: Int!
  - copy number state of segment
