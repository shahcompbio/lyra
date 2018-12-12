---
id: us-analyses
title: User Stories: Analyses
sidebar_label: Analyses
---

## Summary List

As a user, I want to see a summary (title, description, JIRA ticket, library, sample, project) of all the analyses in Lyra so I can see what is available and what they are.

- Determine workflow to get metadata into database
  - Determine what kind of info can be pulled from Colossus
  - Write script to pull from Colossus, generate YAML file?
  - Manually curated YAML file for any missing metadata
  - Write script to load YAML file into database
- Table to show all analyses with specific columns: title, description, project, sample, libraries
  - GraphQL layer to pull relevant information from database
  - UI layer to render given array of analyses

## Filter/Search

As a user, I want to be able to filter for a particular analysis based on metadata (jira ID, library, sample, project, tumour type, etc), so that I can quickly find what I need.

- See the categories of metadata I can filter by
- For each category, see all values that can be selected
  - GraphQL layer to pull data for the above two things
- For each category, can search for particular value
- Addition and removal of filters update list
- For each category, select a value
- Clear all current filters
- Clear particular filters
  - Recycle bubble chart filters from Cellmine

## Select analysis

As a user, I want to be able to select an analysis to view that dashboard, so I can quickly see the relevant information

- Hover over an analysis entry should highlight that entry
- Clicking on analysis entry should select that entry
- Clicking on another entry should clear current dashboard and reload with that entry

## Portability

As a developer, I want to be able to reuse this component in other dashboards, to save development time

- Determine whether it's better to publish as npm library or bit.io
- Create API documentation (should render given all relevant data)
