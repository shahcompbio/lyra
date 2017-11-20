import { fetchQuery } from './index.js'
import { treeRootQuery, parseTreeRoot, treeNodeQuery, parseTreeNode } from './treeCellscape/tree.js'



// Elasticsearch commands for Tree-based Cellscape view




/**
* Fetch tree root record from ElasticSearch
* @return {object} tree root record
* @public
*/
export function fetchTreeRoot() {
	return fetchQuery(treeRootQuery())
				.then(json => parseTreeRoot(json))
}







/**
* Fetch tree node record from ElasticSearch, given nodeID
* @param {string} nodeID
* @return {object} tree node record
* @public
*/
export function fetchTreeNode(nodeID) {
	return fetchQuery(treeNodeQuery(nodeID))
				.then(json => parseTreeNode(json))
}