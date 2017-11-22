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
	fetchTreeRoot: "TREECELLSCAPE_FETCH_TREE_ROOT",
	fetchTreeRootSuccess: "TREECELLSCAPE_FETCH_TREE_ROOT_SUCCESS",

	fetchTreeNode: "TREECELLSCAPE_FETCH_TREE_NODE",
	fetchTreeNodeSuccess: "TREECELLSCAPE_FETCH_TREE_NODE_SUCCESS" 
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