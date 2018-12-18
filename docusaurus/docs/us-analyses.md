---
id: us-analyses
title: User Stories: Analyses
sidebar_label: Analyses
---

## Summary List

As a user, I want to see a summary (title, description, JIRA ticket, library, sample, project) of all the analyses in Lyra so I can see what is available and what they are.

- Determine workflow to get metadata into database
  - [[VIZ-92](https://shahcompbio.atlassian.net/browse/VIZ-92)] Determine what kind of info can be pulled from Colossus
  - [[VIZ-93](https://shahcompbio.atlassian.net/browse/VIZ-93)] Write script to pull from Colossus, generate YAML file?
    - [[VIZ-129](https://shahcompbio.atlassian.net/browse/VIZ-129)] Write tests from pull to Colossus
  - [[VIZ-94](https://shahcompbio.atlassian.net/browse/VIZ-94)] Manually curated YAML file for any missing metadata
  - [[VIZ-95](https://shahcompbio.atlassian.net/browse/VIZ-95)] Write script to load YAML file into database
    - [[VIZ-130](https://shahcompbio.atlassian.net/browse/VIZ-130)] Write tests for metadata data loader
    - [[VIZ-131](https://shahcompbio.atlassian.net/browse/VIZ-131)] Write documentation on YAML file for metadata
  - Reload all current CorruptTree datasets with metadata
- Table to show all analyses with specific columns: title, description, project, sample, libraries
  - [[VIZ-96](https://shahcompbio.atlassian.net/browse/VIZ-96)] GraphQL layer to pull relevant information from database
    - [[VIZ-132](https://shahcompbio.atlassian.net/browse/VIZ-132)] Update graphQL schema documentation
    - [[VIZ-133](https://shahcompbio.atlassian.net/browse/VIZ-133)] Write tests for metadata resolvers
  - [[VIZ-97](https://shahcompbio.atlassian.net/browse/VIZ-97)] UI layer to render given array of analyses

## Filter/Search

As a user, I want to be able to filter for a particular analysis based on metadata (jira ID, library, sample, project, tumour type, etc), so that I can quickly find what I need.

- See the categories of metadata I can filter by
- For each category, see all values that can be selected
  - [[VIZ-98](https://shahcompbio.atlassian.net/browse/VIZ-98)] GraphQL layer to pull data for the above two things
    - [[VIZ-134](https://shahcompbio.atlassian.net/browse/VIZ-134)] Update graphQL schema documentation
    - [[VIZ-135](https://shahcompbio.atlassian.net/browse/VIZ-135)] Write tests for filter resolvers
- For each category, can search for particular value
- Addition and removal of filters update list
- For each category, select a value
- Clear all current filters
- Clear particular filters
  - [[VIZ-99](https://shahcompbio.atlassian.net/browse/VIZ-99)] Recycle bubble chart filters from Cellmine

## Select analysis

As a user, I want to be able to select an analysis to view that dashboard, so I can quickly see the relevant information

- [[VIZ-100](https://shahcompbio.atlassian.net/browse/VIZ-100)] Hover over an analysis entry should highlight that entry
- [[VIZ-101](https://shahcompbio.atlassian.net/browse/VIZ-101)] Clicking on analysis entry should select that entry
- [[VIZ-102](https://shahcompbio.atlassian.net/browse/VIZ-102)] Clicking on another entry should clear current dashboard and reload with that entry

## Portability

As a developer, I want to be able to reuse this component in other dashboards, to save development time

- [[VIZ-103](https://shahcompbio.atlassian.net/browse/VIZ-103)] Determine whether it's better to publish as npm library or bit.io
- [[VIZ-104](https://shahcompbio.atlassian.net/browse/VIZ-104)] Create API documentation (should render given all relevant data)
