---
id: us-backend
title: User Stories: Backend
sidebar_label: Backend
---

## Loading data

As a user, I want to see what the structure of the input files are, so I can pull up my own instance.

- Move/Update parts of main README to docs
- Move/Update loading READMEs to docs

As a user, I want to load tree data as a newick file or gml file.

As a user, I want to load the outputs of the single cell pipeline (metrics, segments, bins).

As a developer, I want to be able to test the scripts in its current state, to ensure backwards compatibility in the future.

- Create testing framework for python scripts
- Write tests for analysis entry loader
- Write tests for tree loader
- Write tests for segments loader
- Document how to run tests
- Integrate into TravisCI

## GraphQL layer

As a user, I want to quickly see what kind of queries I can make to the graphQL layer, as an API.

- Add documentation for graphQL schema

As a developer, I want to test the resolvers of the graphQL layer, to ensure backwards compatibility.

- Create testing framework for graphQL resolvers (javascript)
- Write tests for tree resolvers
- Write tests for segs resolvers
- Write tests for metrics resolvers
- Write tests for analysis resolvers
- Document how to run tests
- Integrate into TravisCI
