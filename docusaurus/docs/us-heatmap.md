---
id: us-heatmap
title: User Stories: Heatmap
sidebar_label: Heatmap
---

## Heatmap alignment

As a user, I need the heatmap rows to correspond to the tree nodes, as it will be easier to spot patterns.

- [[VIZ-136](https://shahcompbio.atlassian.net/browse/VIZ-136)] Update loader to only assign index numbers (for y-position) to leaf nodes (aka cells)
  - [[VIZ-137](https://shahcompbio.atlassian.net/browse/VIZ-137)] Update tests for tree loader

## Heatmap inputs

As a user, I need to be able to view copy number (CN), SNV, breakpoints, and other heatmaps that can be expressed as a matrix.

- [[VIZ-106](https://shahcompbio.atlassian.net/browse/VIZ-106)] Create loader to load CN, SNV, bp, etc as matrix
  - [[VIZ-138](https://shahcompbio.atlassian.net/browse/VIZ-138)] Update documentation for matrix loader
  - [[VIZ-139](https://shahcompbio.atlassian.net/browse/VIZ-139)] Write tests for matrix loader
- [[VIZ-107](https://shahcompbio.atlassian.net/browse/VIZ-107)] GraphQL layer to pull heatmap data from database
  - [[VIZ-140](https://shahcompbio.atlassian.net/browse/VIZ-140)] Update graphQL schema documentation
  - [[VIZ-141](https://shahcompbio.atlassian.net/browse/VIZ-141)] Write tests for heatmap resolver
- [[VIZ-108](https://shahcompbio.atlassian.net/browse/VIZ-108)] Render heatmap

## Heatmap plot swap

As a user, I want to swap between heatmap plots if there are multiple kinds of plots loaded.

- [[VIZ-109](https://shahcompbio.atlassian.net/browse/VIZ-109)] GraphQL layer to detect what types of data are available
  - [[VIZ-142](https://shahcompbio.atlassian.net/browse/VIZ-142)] Update graphQL schema documentation
  - [[VIZ-143](https://shahcompbio.atlassian.net/browse/VIZ-143)] Write tests for heatmap plot types resolver
- [[VIZ-110](https://shahcompbio.atlassian.net/browse/VIZ-110)] UI to display the types of data
- [[VIZ-111](https://shahcompbio.atlassian.net/browse/VIZ-111)] Interaction on UI to change between plots

## Additional information

As a user, I want to be able to see additional information (ID, accompanying tree node) about a row when I hover over it.

## Diff by ploidy

As a user, I want to see a copy number plot normalized by its ploidy, to differentiate between true copy number changes and those that are a result of a whole genome doubling event.

## Diff by most common copy number

As a user, I want to see a copy number plot normalized by the most common copy number profile in a sample, as it will better highlight areas in the genome that are different between cells.
