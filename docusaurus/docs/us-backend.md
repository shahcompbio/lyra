---
id: us-backend
title: User Stories: Backend
sidebar_label: Backend
---

## Loading data

As a user, I want to see what the structure of the input files are, so I can pull up my own instance.

- [[VIZ-113](https://shahcompbio.atlassian.net/browse/VIZ-113)] Move/Update parts of main README to docs
- [[VIZ-114](https://shahcompbio.atlassian.net/browse/VIZ-114)] Move/Update loading READMEs to docs

As a user, I want to load tree data as a newick file or gml file.

- [[VIZ-189](https://shahcompbio.atlassian.net/browse/VIZ-189)] Process CorruptTree input prior to loading

As a user, I want to load the outputs of the single cell pipeline (metrics, segments, bins).

As a developer, I want to be able to test the scripts in its current state, to ensure backwards compatibility in the future.

- [[VIZ-115](https://shahcompbio.atlassian.net/browse/VIZ-115)] Create testing framework for python scripts
- [[VIZ-116](https://shahcompbio.atlassian.net/browse/VIZ-116)] Write tests for analysis entry loader
- [[VIZ-117](https://shahcompbio.atlassian.net/browse/VIZ-117)] Write tests for tree loader
- [[VIZ-118](https://shahcompbio.atlassian.net/browse/VIZ-118)] Write tests for segments loader
- [[VIZ-119](https://shahcompbio.atlassian.net/browse/VIZ-119)] Document how to run tests
- [[VIZ-120](https://shahcompbio.atlassian.net/browse/VIZ-120)] Integrate into TravisCI
- [[VIZ-172](https://shahcompbio.atlassian.net/browse/VIZ-172)] Create Docker image for Elasticsearch instance
- [[VIZ-174](https://shahcompbio.atlassian.net/browse/VIZ-174)] Refactor loading scripts

As a developer, I want to be able to modularize the loaders, so I can use them in other projects

- [[VIZ-195](https://shahcompbio.atlassian.net/browse/VIZ-195)] Create package for Python loaders

## GraphQL layer

As a user, I want to quickly see what kind of queries I can make to the graphQL layer, as an API.

- [[VIZ-121](https://shahcompbio.atlassian.net/browse/VIZ-121)] Add documentation for graphQL schema

As a developer, I want to test the resolvers of the graphQL layer, to ensure backwards compatibility.

- [[VIZ-122](https://shahcompbio.atlassian.net/browse/VIZ-122)] Create testing framework for graphQL resolvers (javascript)
- [[VIZ-123](https://shahcompbio.atlassian.net/browse/VIZ-123)] Write tests for tree resolvers
- [[VIZ-124](https://shahcompbio.atlassian.net/browse/VIZ-124)] Write tests for segs resolvers
- [[VIZ-125](https://shahcompbio.atlassian.net/browse/VIZ-125)] rite tests for metrics resolvers
- [[VIZ-126](https://shahcompbio.atlassian.net/browse/VIZ-126)] Write tests for analysis resolvers
- [[VIZ-127](https://shahcompbio.atlassian.net/browse/VIZ-127)] Document how to run tests
- [[VIZ-128](https://shahcompbio.atlassian.net/browse/VIZ-128)] Integrate into TravisCI
