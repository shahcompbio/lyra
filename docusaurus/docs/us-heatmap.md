---
id: us-heatmap
title: User Stories: Heatmap
sidebar_label: Heatmap
---

## Heatmap alignment

As a user, I need the heatmap rows to correspond to the tree nodes, as it will be easier to spot patterns.

## Heatmap inputs

As a user, I need to be able to view copy number (CN), SNV, breakpoints, and other heatmaps that can be expressed as a matrix.

- Create loader
- GraphQL layer
- Render

## Heatmap plot swap

As a user, I want to swap between heatmap plots if there are multiple kinds of plots loaded.

- GraphQL layer to detect what types of data are available
- UI to display the types of data
- Interaction on UI to change between plots (state change?)

## Additional information

As a user, I want to be able to see additional information (ID, accompanying tree node) about a row when I hover over it.

## Diff by ploidy

As a user, I want to see a copy number plot normalized by its ploidy, to differentiate between true copy number changes and those that are a result of a whole genome doubling event.

## Diff by most common copy number

As a user, I want to see a copy number plot normalized by the most common copy number profile in a sample, as it will better highlight areas in the genome that are different between cells.
