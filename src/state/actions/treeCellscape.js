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

	/** Fetch tree nodes from database*/
	fetchTreeNode: "TREECELLSCAPE_FETCH_TREE_NODE",
	fetchTreeNodesSuccess: "TREECELLSCAPE_FETCH_TREE_NODES_SUCCESS",

	/** Add tree elements to store*/
	addTreeElements: "TREECELLSCAPE_ADD_ELEMENTS",


	/** Fetch chromosome min and max ranges*/
	fetchChromRanges: "TREECELLSCAPE_FETCH_CHROM_RANGES",
	fetchChromRangesSuccess: "TREECELLSCAPE_FETCH_CHROM_RANGES_SUCCESS",


	/** Fetch segment data */
	fetchSegs: "TREECELLSCAPE_FETCH_SEGMENTS",
	fetchSegsSuccess: "TREECELLSCAPE_FETCH_SEGMENTS_SUCCESS",


	/** Fetch missing index to ID mappings */
	fetchIndexToIDMappings: "TREECELLSCAPE_FETCH_INDEX_ID_MAPPINGS",
	fetchIndexToIDMappingsSuccess: "TREECELLSCAPE_FETCH_INDEX_ID_MAPPINGS_SUCCESS",



	/** Highlight/Unhighlighted tree node/cluster or heatmap row */
	highlightElement: "TREECELLSCAPE_HIGHLIGHT_ELEMENT",
	unhighlightElement: "TREECELLSCAPE_UNHIGHLIGHT_ELEMENT",


	/** set new tree root */
	setTreeRoot: "TREECELLSCAPE_SET_TREE_ROOT"

}




// Action Creators


/**
* Fetch Tree Root
*/
export const fetchTreeRoot = () => ({
	type: types.fetchTreeRoot
})


/**
* Fetch tree root is successful
* @param {object} treeRoot - tree root record
*/
export const fetchTreeRootSuccess = (treeRoot) => ({
	type: types.fetchTreeRootSuccess,
	root: treeRoot
})


/**
* Fetch tree nodes for given cellIDs
* @param {string} nodeID
*/
export const fetchTreeNode = (nodeID) => ({
	type: types.fetchTreeNode,
	nodeID
})

/**
* Fetch tree nodes is successful
* @param {array} treeNodes - all tree node records
* @param {array} nodeIDs
*/
export const fetchTreeNodesSuccess = (treeNodes, nodeIDs) => ({
	type: types.fetchTreeNodesSuccess,
	treeNodes,
	nodeIDs
})


/**
* Add tree elements to store
* @param {array} elements - list of nodes and clusters
*/
export const addTreeElements = (elements) => ({
	type: types.addTreeElements,
	elements
})


/**
* Fetch chromosome ranges (start and ends)  
*/
export const fetchChromRanges = () => ({
	type: types.fetchChromRanges
})

/**
* Fetch chromosome ranges is successful
* @param {array} chromosomes
*/
export const fetchChromRangesSuccess = (chromosomes) => ({
	type: types.fetchChromRangesSuccess,
	chromosomes
})


/**
* Fetch segments given heatmap indices
* @param {array} indices
*/
export const fetchSegs = (indices) => ({
	type: types.fetchSegs,
	indices
})


/**
* Fetch segments is successful
* @param {array} segs - all segment records
* @param {array} indices
* @param {array} ids - cellIDs (maps in order with indices)
*/
export const fetchSegsSuccess = (segs, indices, ids) => ({
	type: types.fetchSegsSuccess,
	segs,
	indices,
	ids
})

/**
* Fetch index to cellID mappings is successful
* @param {array} records
*/
export const fetchIndexToIDMappingsSuccess = (records) => ({
	type: types.fetchIndexToIDMappingsSuccess,
	records
})




/**
* Highlight given cell index/indices
* @param {int || array} index
*/
export const highlightElement = ({ index, range }) => ({
	type: types.highlightElement,
	index,
	range
})



/**
* Unhighlight current cell index/indices
*/
export const unhighlightElement = () => ({
	type: types.unhighlightElement
})


/**
* Set tree root as nodeID
* @param {string} nodeID
*/
export const setTreeRoot = (nodeID) => ({
	type: types.setTreeRoot,
	nodeID
})

