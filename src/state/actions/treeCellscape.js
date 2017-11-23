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

	/** After aggregation of children, add that to list*/
	addChildrenAggregations: "TREECELLSCAPE_ADD_CHILDREN_AGGREGATION"

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
* Add list of aggregations of tree's children to list
* @param {array} aggs - list of children aggregations
* @return {object}
* @public
*/
export const addChildrenAggregations = (aggs) => ({
	type: types.addChildrenAggregations,
	aggs
})