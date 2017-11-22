/**
*	Queries and parsers related to the tree view in Tree Cellscape
*/
import { MAPPINGS } from 'config/treeCellscape.js'

// Fetching root of tree

/**
* Get query for tree root
* @return {Query} query
* @public
*/
export const treeRootQuery = () => ({
  "size": 1,
  "query": {
    "bool": {
      "filter": [
      	{ "term": { "parent": "root" }}
      ]
    }
  }
})


/**
* Parse query result from tree root query
* @param {JSON} json - JSON result from ElasticSearch query
* @return {object} tree root record
* @public
*/
export const parseTreeRoot = (json) => {
 	return { ...processTreeRecord(json.hits.hits[0]["_source"]) }
}







// Fetching tree nodes


/**
* Get query to get tree node, and name/index/depth for its children
* @param {string} nodeID
* @return {Query}
* @public
*/
export const treeNodeQuery = (nodeID) => {
	const parentTerm = { "term" : { "parent": nodeID }}
	const nodeTerm = { "term": { "cell_id": nodeID }}

	const baseQuery = {
		"size": 50000,
		"query": {
			"bool": {
				"should": [parentTerm, nodeTerm]
			}
		}
	}

	const queryWithChildrenAggs = addChildrenIndexAggToQuery(baseQuery, parentTerm) 
	const query = addPostFilterForNodeToQuery(queryWithChildrenAggs, nodeTerm)
	return query
}


/**
* Add aggregation for children name, depth, and heatmap index to given query
* @param {Query} query - base query so far
* @param {Query} parentTerm - filter for nodes with certain node as parent
* @return {Query} 
*/
const addChildrenIndexAggToQuery = (query, parentTerm) => ({
	...query,
	"aggs": {
		"children": {
			"filter": parentTerm,
			"aggs": {
				"children_name": {
					"terms": {
						"field": "cell_id",
						"size": 50000
					},
					"aggs": {
						"children_index": {
							"terms": {
								"field": "heatmap_order",
								"size": 50000
							}
						},
			            "children_height": {
			              "terms": {
			                "field": "max_height",
			                "size": 10
			              }
			            }
					}
				}
			}
		}
	}
})

/**
* Add post query filter for node with specific ID to given query
* @param {Query} query - base query
* @param {Query} nodeTerm - filter for nodes with specific ID
* @return {Query} 
*/
const addPostFilterForNodeToQuery = (query, nodeTerm) => ({
	...query,
	"post_filter": nodeTerm
})



/**
* Parse query results for tree node and children aggregation
* @param {JSON} json - query result from tree node query
* @return {object} tree node record
* @property {array} children  node's children with name, heatmap index, and depth to deepest child
* @public
*/
export const parseTreeNode = (json) => {
	const nodeData = { ...processTreeRecord(json.hits.hits[0]["_source"]) }
	const children = parseNodeChildren(json.aggregations["children"]["children_name"]["buckets"])
							.sort(sortByHeatmapOrder)

	return { ...nodeData,
			 children }
}


/**
* 
* @param {JSON} childAggs - aggregations containing children data
* @return {array} all children with name, heatmap index, and depth to deepest child
*/
const parseNodeChildren = (childAggs) => (
	childAggs.map((child) => ({
			[MAPPINGS['cell_id']]: child.key,
			[MAPPINGS['heatmap_order']]: getBucketValueForChild(child["children_index"]),
			[MAPPINGS['max_height']]: getBucketValueForChild(child["children_height"])
		})
	)
)

/**
* @param {JSON} indexBucket
* @return {number|string} value for bucket
*/
const getBucketValueForChild = (indexBucket) => (
	indexBucket.buckets[0].key
)


/**
* Comparer for children, sorted by heatmap index
* @param {object} childA
* @param {number} childA.heatmapIndex
* @param {object} childB
* @param {number} childB.heatmapIndex
* @return {number} indicator of whether to put childA before (-1) or after (1) childB
*/
const sortByHeatmapOrder = (childA, childB) => {
	return childA['heatmapIndex'] < childB['heatmapIndex'] ? -1
		 : childA['heatmapIndex'] > childB['heatmapIndex'] ? 1
		 : 0
}













/**
* @param {JSON} record - tree node record
* @return {object} processed tree record with mapped keys
*/
const processTreeRecord = (record) => {
	let processedRecord = {}
	for (let [key, value] of Object.entries(record)) {
		processedRecord = {
			...processedRecord,
			[MAPPINGS[key]]: value
		}
	}
	return processedRecord
}

