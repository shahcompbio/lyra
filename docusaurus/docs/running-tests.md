---
id: running-tests
title: Running Tests
sidebar_label: Running Tests
---

These instructions will show how to run the unit and integration tests for the different parts of the system. Note that it assumes that the system requirements have been met.

You will also need to install [Docker](https://www.docker.com/).

## Setting up Elasticsearch Docker container

For the integration tests, an Elasticsearch instance must be running. To separate it from a local instance, we will containerize it for the tests.

```
cd loader
docker build --tag=elasticsearchtest .
docker run -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearchtest
```

## Python Loaders

To run the tests for the Python loaders, make sure you have pytest installed.

```
pip install -U pytest
```

Then start the virtualenv and run the tests from the loader directory.

```
source ~/pythonenv/bin/activate
pytest

or

source ~/pythonenv/bin/activate
python -m pytest test -v -s
```

## GraphQL

The tests for the graphQL layer assumes that there is some example data in the ElasticSearch instance. Load them with the python loaders. Then run the tests.

```
source ~/pythonenv/bin/activate
cd loader
python tree_cellscape/tree_cellscape_loader.py -y ../example/analysis_yaml.yaml

cd ..
yarn test
```
