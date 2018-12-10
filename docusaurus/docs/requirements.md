---
id: requirements
title: Requirements
sidebar_label: Requirements
---

## Assumptions

- Tree data will contain cells within leaf nodes, not internal

## Functional

- Summary of all libraries loaded so far (title, description, JIRA ticket, library, sample)
- Filter library summary by metadata (jira ID, library, sample, project, tumour type, etc)
- Tree accounts for branch length
- Initial tree view shows summary based on branch length\*
- Heatmap accompanies tree
- Swap between any kind of heatmap that can be conveyed in matrix (CN, SNV, breakpoints, corrupt tree output)\*\*

\* Andrew recommends: given a count of viewable nodes, we find the subtree with the same root as the given tree such that the subtree has the given node count and the largest total branch length

\*\* May need to downsample this

## Non-Functional

- Use React, TypeScript, Apollo (graphQL)
- Views are connected through graphQL
- Unit tests
