import { fetchForDataType } from "/api/index.js";
import { processRecord } from "/api/utils.js";

export const MAPPINGS = {
  cell_id: "cellID",
  heatmap_order: "heatmapIndex",
  children: "children",
  parent: "parent",
  max_height: "maxHeight",
  min_index: "minDescendantIndex",
  max_index: "maxDescendantIndex"
};

/**
 * Fetch tree root record from ElasticSearch
 * @return {object} tree root record
 * @public
 */
export function fetchTreeRoot() {
  return fetchForDataType(treeRootQuery(), "tree").then(json =>
    parseTreeRoot(json)
  );
}

/**
 * Get query for tree root
 * @return {Query} query
 * @public
 */
const treeRootQuery = () => ({
  size: 1,
  query: {
    bool: {
      filter: [{ term: { parent: "root" } }]
    }
  }
});

/**
 * Parse query result from tree root query
 * @param {JSON} json - JSON result from ElasticSearch query
 * @return {object} tree root record
 * @public
 */
const parseTreeRoot = json => {
  return { ...processRecord(json.hits.hits[0]["_source"], MAPPINGS, false) };
};

// Fetching tree nodes

/**
 * Fetch tree node record from ElasticSearch, given nodeIDs
 * @param {array} nodeIDs
 * @return {array} tree node records
 * @public
 */
export function fetchTreeNodes(nodeIDs) {
  return fetchForDataType(treeNodeQuery(nodeIDs), "tree").then(json =>
    parseTreeNode(json)
  );
}

/**
 * Get query to get tree node, and name/index/depth for its children
 * @param {array} nodeIDs
 * @return {Query}
 * @public
 */
const treeNodeQuery = nodeIDs => {
  const parentTerm = { terms: { parent: nodeIDs } };
  const nodeTerm = { terms: { cell_id: nodeIDs } };

  const baseQuery = {
    size: 50000,
    query: {
      bool: {
        should: [parentTerm, nodeTerm]
      }
    }
  };

  const queryWithChildrenAggs = addChildrenIndexAggToQuery(
    baseQuery,
    parentTerm
  );
  const query = addPostFilterForNodeToQuery(queryWithChildrenAggs, nodeTerm);
  return query;
};

/**
 * Add aggregation for children name, depth, and heatmap index to given query
 * @param {Query} query - base query so far
 * @param {Query} parentTerm - filter for nodes with certain node as parent
 * @return {Query}
 */
const addChildrenIndexAggToQuery = (query, parentTerm) => ({
  ...query,
  aggs: {
    children: {
      filter: parentTerm,
      aggs: {
        children_name: {
          terms: {
            field: "cell_id",
            size: 50000
          },
          aggs: {
            children_index: {
              terms: {
                field: "heatmap_order",
                size: 50000
              }
            },
            children_height: {
              terms: {
                field: "max_height",
                size: 10
              }
            },
            children_minIndex: {
              terms: {
                field: "min_index",
                size: 10
              }
            },
            children_maxIndex: {
              terms: {
                field: "max_index",
                size: 10
              }
            }
          }
        }
      }
    }
  }
});

/**
 * Add post query filter for node with specific ID to given query
 * @param {Query} query - base query
 * @param {Query} nodeTerm - filter for nodes with specific ID
 * @return {Query}
 */
const addPostFilterForNodeToQuery = (query, nodeTerm) => ({
  ...query,
  post_filter: nodeTerm
});

/**
 * Parse query results for tree node and children aggregation
 * @param {JSON} json - query result from tree node query
 * @return {array} tree node records
 * @public
 */
const parseTreeNode = json => {
  const nodesData = json.hits.hits.map(record =>
    processRecord(record["_source"], MAPPINGS, false)
  );
  const children = parseNodeChildren(
    json.aggregations["children"]["children_name"]["buckets"]
  );

  return [...nodesData, ...children];
};

/**
 *
 * @param {JSON} childAggs - aggregations containing children data
 * @return {array} all children with name, heatmap index, and depth to deepest child
 */
const parseNodeChildren = childAggs =>
  childAggs.map(child => ({
    [MAPPINGS["cell_id"]]: child.key,
    [MAPPINGS["heatmap_order"]]: getBucketValueForChild(
      child["children_index"]
    ),
    [MAPPINGS["max_height"]]: getBucketValueForChild(child["children_height"]),
    [MAPPINGS["min_index"]]: getBucketValueForChild(child["children_minIndex"]),
    [MAPPINGS["max_index"]]: getBucketValueForChild(child["children_maxIndex"])
  }));

/**
 * @param {JSON} indexBucket
 * @return {number|string} value for bucket
 */
const getBucketValueForChild = indexBucket => indexBucket.buckets[0].key;
