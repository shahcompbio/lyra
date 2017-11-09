import { fetchQuery } from '../elasticsearch/index.js'

const MAPPINGS = {
	cell_id: 'cellID',
	num_successors: 'numSuccessors',
	heatmap_order: 'heatmapIndex',
	children: 'children',
	parent: 'parent'
}


export function fetchTreeRoot() {
	return fetchQuery(treeRootQuery())
				.then(json => parseTreeRoot(json))
}


const treeRootQuery = () => ({
  "size": 1,
  "query": {
    "bool": {
      "filter": [
      	{ "term": { "parent": "root" }}
      ]
    }
  }
})


const parseTreeRoot = (json) => {
 	return { ...processTreeRecord(json.hits.hits[0]["_source"]) }
}









export function fetchTreeNode(nodeID) {
	return fetchQuery(treeNodeQuery(nodeID))
				.then(json => parseTreeNode(json))
}


const treeNodeQuery = (nodeID) => {
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
						}
					}
				}
			}
		}
	}
})

const addPostFilterForNodeToQuery = (query, nodeTerm) => ({
	...query,
	"post_filter": nodeTerm
})

const parseTreeNode = (json) => {
	const nodeData = { ...processTreeRecord(json.hits.hits[0]["_source"]) }
	const children = parseNodeChildren(json.aggregations["children"]["children_name"]["buckets"])
							.sort(sortByHeatmapOrder)

	return { ...nodeData,
			 children }
}


const parseNodeChildren = (childAggs) => (
	childAggs.map((child) => ({
			[MAPPINGS['cell_id']]: child.key,
			[MAPPINGS['heatmap_order']]: getHeatmapOrderForChild(child["children_index"])
		})
	)
)


const getHeatmapOrderForChild = (indexBucket) => (
	indexBucket.buckets[0].key
)


const sortByHeatmapOrder = (childA, childB) => {
	return childA['heatmapIndex'] < childB['heatmapIndex'] ? -1
		 : childA['heatmapIndex'] > childB['heatmapIndex'] ? 1
		 : 0
}






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

