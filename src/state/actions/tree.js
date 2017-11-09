

export const types = {
	fetchRoot: "FETCH_TREE_ROOT",
	fetchRootSuccess: "FETCH_TREE_ROOT_SUCCESS",

	fetchTreeNode: "FETCH_TREE_NODE",
	fetchTreeNodeSuccess: "FETCH_TREE_NODE_SUCCESS" 
}

export const fetchRoot = () => ({
	type: types.fetchRoot
})

export const fetchRootSuccess = (treeRoot) => ({
	type: types.fetchRootSuccess,
	root: treeRoot
})


export const fetchTreeNode = (nodeID) => ({
	type: types.fetchTreeNode,
	nodeID
})


export const fetchTreeNodeSuccess = (treeNode) => ({
	type: types.fetchTreeNodeSuccess,
	treeNode
})