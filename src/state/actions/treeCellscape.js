/**
* Actions and action creators for tree cellscape
*/




// Actions

/**
* Action types
* @typeof {object}
* @public
*/
export const types = {
	/** Fetch tree root ID from database*/
	fetchTreeRoot: "TREECELLSCAPE_FETCH_TREE_ROOT",
	fetchTreeRootSuccess: "TREECELLSCAPE_FETCH_TREE_ROOT_SUCCESS",

	/** Fetch tree root node from database*/
	fetchTreeNode: "TREECELLSCAPE_FETCH_TREE_NODE",
	fetchTreeNodeSuccess: "TREECELLSCAPE_FETCH_TREE_NODE_SUCCESS",

	/** Add summary of tree children to store*/
	addChildrenSummary: "TREECELLSCAPE_ADD_SUMMARY",


	/** Fetch segment data */
	fetchSegs: "TREECELLSCAPE_FETCH_SEGMENTS",
	fetchSegsSuccess: "TREECELLSCAPE_FETCH_SEGMENTS_SUCCESS",


	/** Fetch missing index to ID mappings */
	fetchIndexToIDMappings: "TREECELLSCAPE_FETCH_INDEX_ID_MAPPINGS",
	fetchIndexToIDMappingsSuccess: "TREECELLSCAPE_FETCH_INDEX_ID_MAPPINGS_SUCCESS"


}




// Action Creators


/**
* Fetch Tree Root
* @return {object}
* @public
*/
export const fetchTreeRoot = () => ({
	type: types.fetchTreeRoot
})


/**
* Fetch tree root is successful
* @param {object} treeRoot - tree root record
* @return {object}
* @public
*/
export const fetchTreeRootSuccess = (treeRoot) => ({
	type: types.fetchTreeRootSuccess,
	root: treeRoot
})


/**
* Fetch tree node
* @param {string} nodeID
* @return {object}
* @public
*/
export const fetchTreeNode = (nodeID) => ({
	type: types.fetchTreeNode,
	nodeID
})

/**
* Fetch tree node is successful
* @param {object} treeNode - tree node record
* @return {object}
* @public
*/
export const fetchTreeNodeSuccess = (treeNode) => ({
	type: types.fetchTreeNodeSuccess,
	treeNode
})


/**
* Add summary of tree's children to store
* @param {array} summary - collection of nodes and clusters
* @return {object}
* @public
*/
export const addChildrenSummary = (summary) => ({
	type: types.addChildrenSummary,
	summary
})



/**
* 
*/
export const fetchSegs = (indices) => ({
	type: types.fetchSegs,
	indices
})


/**
*
*/
export const fetchSegsSuccess = (segs, indices, ids) => ({
	type: types.fetchSegsSuccess,
	segs,
	indices,
	ids
})

/**
* 
*/
export const fetchIndexToIDMappingsSuccess = (records) => ({
	type: types.fetchIndexToIDMappingsSuccess,
	records
})