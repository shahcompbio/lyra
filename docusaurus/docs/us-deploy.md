---
id: us-deploy
title: User Stories: Deployment
sidebar_label: Deployment
---

## Deployment

As a developer, I want to set up a production-level instance of Lyra in an easy manner.

- Write playbook to create clusters of Elasticsearch nodes (latest version)
- Write playbook to create a webserver with graphQL layer and nginx reverse proxy
- Write documentation on how to run playbooks

As a user, I want to load the output of a phylogeny-generating pipeline to Lyra in an automated way.

- Figure out logistics of tree output (format it'll be, where files will be stored)
- Figure out how metadata about libraries involved in the tree will be captured
- - [[VIZ-192](https://shahcompbio.atlassian.net/browse/VIZ-192)] Load trees into Lyra

As a developer, I want to automate deployment when updates are pushed

- [[VIZ-170](https://shahcompbio.atlassian.net/browse/VIZ-170)] Create staging vs master branches with proper Travis setup
- [[VIZ-191](https://shahcompbio.atlassian.net/browse/VIZ-191)] Turn on VM as part of Travis build
