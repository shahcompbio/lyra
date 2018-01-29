import { fetchQuery } from './index.js'
import { treeRootQuery, parseTreeRoot, treeNodeQuery, parseTreeNode } from './treeCellscape/tree.js'

import { indexToIDQuery, parseIndexToIDs, segsByIDsQuery, parseCellSegs, chromRangesQuery, parseChromRanges } from './treeCellscape/heatmap.js'



// Elasticsearch commands for Tree-based Cellscape view


const CONFIG = {
	//TREE_INDEX: "tree_test",
	//SEG_INDEX: "a73044b_sc-561_denormalized"

	//TREE_INDEX: "htert_tree",
	//SEG_INDEX: "htert_seg",

	TREE_INDEX: "htert_sc763_tree",
	SEG_INDEX: "htert_sc763_seg"
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
* Fetch tree node record from ElasticSearch, given nodeIDs
* @param {array} nodeIDs
* @return {array} tree node records
* @public
*/
export function fetchTreeNodes(nodeIDs) {
	return fetchForDataType(treeNodeQuery(nodeIDs), "tree")
				.then(json => parseTreeNode(json))
}




/**
* Fetch cellIDs from Elasticsearch, given heatmap indices
* @param {array} indices
* @public
*/
export function fetchIDsByIndices(indices) {
	return fetchForDataType(indexToIDQuery(indices), "tree")
				.then(json => parseIndexToIDs(json))
}


/**
* Fetch segment data from Elasticsearch, given cellIDs
* @param {array} ids
* @public
*/
export function fetchSegsByIDs(ids) {
	return fetchForDataType(segsByIDsQuery(ids), "segs")
				.then(json => parseCellSegs(json))

}



/**
* Fetch chromosome ranges from Elasticsearch
* @public
*/
export function fetchChromRanges() {
	return fetchForDataType(chromRangesQuery(), "segs")
				.then(json => parseChromRanges(json))
}