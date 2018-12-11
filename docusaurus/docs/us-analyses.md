---
id: us-analyses
title: User Stories: Analyses
sidebar_label: Analyses
---

## Summary List

As a user, I want to see a summary (title, description, JIRA ticket, library, sample, project) of all the analyses in Lyra so I can see what is available and what they are.

- Determine workflow to get metadata into database
- Table to show all analyses with specific columns: title, description, project, sample, libraries

## Filter/Search

As a user, I want to be able to filter for a particular analysis based on metadata (jira ID, library, sample, project, tumour type, etc), so that I can quickly find what I need.

- See the categories of metadata I can filter by
- For each category, can search for particular value
- For each category, see all values that can be selected
- Addition and removal of filters update list
- For each category, select a value
- Clear all current filters
- Clear particular filters

## Select analysis

As a user, I want to be able to select an analysis to view that dashboard, so I can quickly see the relevant information

- Hover over an analysis entry should highlight that entry
- Clicking on analysis entry should select that entry
- Clicking on another entry should clear current dashboard and reload with that entry
