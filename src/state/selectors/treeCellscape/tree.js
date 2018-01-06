/**
* Selectors for tree drawing
*/


import { createSelector } from 'reselect'
import { treeConfig } from 'config/treeCellscape.js'
import { scaleLinear } from 'd3'


import { getTotalIndexNum, getTreeRootRecord, getIndicesPerPixel, getThresholdIndex } from './utils.js'

import { stateSelectors } from 'state/reducers/index.js'

const { 
	treeRootIDSelector,
	treeDataSelector
} = stateSelectors



/******************************************
* STATE TREE SELECTORS
*******************************************/

const getTreeRootID = treeRootIDSelector
const getTreeNodeRecords = treeDataSelector






/******************************************
* DATA SELECTORS
*******************************************/


/**
* Factory function - gets tree record for specific cell ID
*/
export const makeGetTreeNodeRecord = () => (createSelector(
	[ getTreeNodeRecords, (state, id) => id ],
	// (object, string) => object || null
	(nodes, id) => {
		const node = nodes[id]
		return isFullRecord(node) ? node : null
	}
))

/**
* Determines whether record is full (has child attributes)
* @param {object} node - record
* @return {bool}
*/
const isFullRecord = (node) => (node !== undefined && node.hasOwnProperty('children'))









/**
* 	Factory function - gets summary list (nodes and clusters) of tree's (by cell ID) children
*/
export const makeGetTreeChildrenSummary = () => {
	const getTreeNodeRecordsByID = makeGetTreeNodeRecordsByID()
	return createSelector(
	[ getTreeNodeRecordsByID, getThresholdIndex ],
	// (array, int) => array
	summaryTreeChildren
)}


/**
* Factory function - Get shallow tree node records given list of IDs
*/
const makeGetTreeNodeRecordsByID = () => (createSelector(
	[ getTreeNodeRecords, (state, ids) => (ids) ],
	// (object, array) => array
	(nodes, ids) => (ids.map(nodeID => {
		const { heatmapIndex, maxHeight, cellID, minDescendantIndex, maxDescendantIndex } = nodes[nodeID]
		return { heatmapIndex, maxHeight, cellID, minDescendantIndex, maxDescendantIndex }
	}))
))




/**
* Summarize children, based on whether distance between siblings is greater than threshold
* @param {array} children
* @param {int} thresholdIndex
* @return {array} list of clusters and nodes
*/
const summaryTreeChildren = (children, thresholdIndex) => {
	let clusterDimensions = initializeCluster()
	let i = 0

	let summary = []
	while (i < children.length) {
		const currNode = children[i]

		if (isClusterCreating(clusterDimensions)) {
			if (isNodeDescendantsExceedThreshold(currNode, thresholdIndex)) {
				summary = [ ...summary, { ...clusterDimensions } ]
				clusterDimensions = initializeCluster()
				summary = [ ...summary, { ...currNode } ]
			}
			else if (isLastNode(i, children)) {
				clusterDimensions = mergeNodeToCluster(clusterDimensions, currNode)

				summary = [ ...summary, { ...clusterDimensions } ]
				clusterDimensions = initializeCluster()

			}
			else {
				clusterDimensions = mergeNodeToCluster(clusterDimensions, currNode)
			}
		}

		else {
			if (isNodeDescendantsExceedThreshold(currNode, thresholdIndex)) {
				summary = [ ...summary, { ...currNode } ]
			}

			else if (isLastNode(i, children) || isNodeDescendantsExceedThreshold(children[i+1], thresholdIndex)) {
				summary = [ ...summary, { ...currNode } ]
			}

			else {
				clusterDimensions = startClusterDrawing(currNode)

			}
		}

		i++
	}

	return summary
}


/**
* Determines whether number of descendants of node exceeds threshold index
* @param {object} node
* 	@param {int} node.maxDescendantIndex
*   @param {int} node.minDescendantIndex
* @param {int} threshold
*/
const isNodeDescendantsExceedThreshold = (node, threshold) => (
	node['maxDescendantIndex'] - node['minDescendantIndex'] + 1 > threshold
)


/**
* Determines whether current index is at last node
* @param {int} i - current index
* @param {array} children
* @return {bool}
*/
const isLastNode = (i, children) => (
	i + 1 >= children.length
)





/**
* clusterDimesions {object}
* 	clusterDimensions.isCreating {bool} - whether cluster is currently being created
* 	clusterDimensions.startIndex {int}
*	clusterDimensions.endIndex {int}
* 	clusterDimensions.maxHeight {int} - tallest branch so far
*/
const initializeCluster = () => ({
	isCreating: false
})

const isClusterCreating = (clusterDimensions) => (
	clusterDimensions.isCreating
)

const startClusterDrawing = (currNode) => ({
	isCreating: true,
	startIndex: currNode['minDescendantIndex'],
	endIndex: currNode['maxDescendantIndex'],
	maxHeight: currNode['maxHeight']
})

const mergeNodeToCluster = (clusterDimensions, currNode) => ({
	...clusterDimensions,
	endIndex: currNode['maxDescendantIndex'],
	maxHeight: Math.max(clusterDimensions['maxHeight'], currNode['maxHeight'])
})














/******************************************
* DRAWING SELECTORS
*******************************************/



/**
* Gets heatmap index to y-coordinate scale
*/
export const getYScale = createSelector(
	[ getTotalIndexNum ],
	// int => func
	(numNodes) => (
		scaleLinear().domain([0, numNodes - 1])
					 .range([treeConfig['treeNodeRadius'], treeConfig['height']])
	)
)


/**
* Get max height of tree
*/
const getMaxHeight = createSelector(
	[ getTreeRootRecord ],
	// object => int
	(treeRoot) => (treeRoot['maxHeight'])
)





/**
* Get color scale for cluster height
*/ 
export const getClusterColorScale = createSelector(
	[ getMaxHeight ],
	// int => func
	(maxHeight) => scaleLinear().domain([0, maxHeight])
					 .range(treeConfig['treeClusterColorGradient'])
)









/**
* Gets offset index distance - the number of indices to remove at the end for branch/cluster spacing
*/
export const getOffsetIndex = createSelector(
	[ getIndicesPerPixel ],
	// int => int
	(indPerPx) => (indPerPx * treeConfig['treeClusterVerticalOffset'])
)


