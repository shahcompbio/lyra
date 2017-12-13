import { fetchQuery } from './index.js'
import { treeRootQuery, parseTreeRoot, treeNodeQuery, parseTreeNode } from './treeCellscape/tree.js'

import { indexToIDQuery, parseIndexToIDs, segsByIDsQuery, parseCellSegs } from './treeCellscape/heatmap.js'



// Elasticsearch commands for Tree-based Cellscape view


const CONFIG = {
	TREE_INDEX: "tree_test",
	SEG_INDEX: "a73044b_sc-561_denormalized"
}



/**
* Fetches appropriate index according to data type
*/
function fetchForDataType(query, dataType) {
	const index = dataType === "tree" ? CONFIG.TREE_INDEX : CONFIG.SEG_INDEX

	return fetchQuery(query, index)
}





/**
* Fetch tree root record from ElasticSearch
* @return {object} tree root record
* @public
*/
export function fetchTreeRoot() {
	return fetchForDataType(treeRootQuery(), "tree")
				.then(json => parseTreeRoot(json))
}







/**
* Fetch tree node record from ElasticSearch, given nodeID
* @param {string} nodeID
* @return {object} tree node record
* @public
*/
export function fetchTreeNode(nodeID) {
	return fetchForDataType(treeNodeQuery(nodeID), "tree")
				.then(json => parseTreeNode(json))
}




/**
*
*/
export function fetchIDsByIndicesFromAPI(indices) {
	return fetchForDataType(indexToIDQuery(indices), "tree")
				.then(json => parseIndexToIDs(json))
}


/**
*
*/
export function fetchSegsByIDsFromAPI(ids) {
	return fetchForDataType(segsByIDsQuery(ids), "segs")
				.then(json => parseCellSegs(json))

}