/**
* Selectors for tree drawing
*/


import { createSelector } from 'reselect'
import { treeConfig as config, heatmapConfig } from 'config/treeCellscape.js'
import { scaleLinear } from 'd3'


import { getTotalIndexNum, getTreeRootRecord, getIndicesPerPixel, getThresholdIndex } from './utils.js'

import { stateSelectors } from 'state/reducers/index.js'

const { 
	treeRootIDSelector,
	treeNodesSelector
} = stateSelectors



/******************************************
* STATE TREE SELECTORS
*******************************************/

const getTreeRootID = treeRootIDSelector
const getTreeNodeRecords = treeNodesSelector










/******************************************
* DATA SELECTORS
*******************************************/


/**
* Factory function for TreeNode React component, to get an entire tree node record given ID
* @return {func} selector
*	@param {object} state
* 	@param {string} id
*	@return {object || null} record of nodeID, null if not full record
*/
export const makeGetTreeNodeRecord = () => (createSelector(
	[ getTreeNodeRecords, (state, id) => id ],
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
* 	Factory function to get summary children list (clusters and nodes)
*/
export const makeGetTreeChildrenSummary = () => (createSelector(
	[ getTreeNodeRecordsByID, getThresholdIndex ],
	summaryTreeChildren
))


/**
* Get shallow tree node records given list of IDs
* @param {array} ids
* @return {array} records 
*/
const getTreeNodeRecordsByID = createSelector(
	[ getTreeNodeRecords, (state, ids) => (ids) ],
	(nodes, ids) => (ids.map(nodeID => {
		const { heatmapIndex, maxHeight, cellID, minDescendantIndex, maxDescendantIndex } = nodes[nodeID]
		return { heatmapIndex, maxHeight, cellID, minDescendantIndex, maxDescendantIndex }
	}))
)




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
* Get yScale (index to pixel)
* @param {int} numNodes
* @return {scale} d3 scale
*/
export const getYScale = createSelector(
	[ getTotalIndexNum ],
	(numNodes) => (
		scaleLinear().domain([0, numNodes - 1])
					 .range([config['treeNodeRadius'], config['height']])
	)
)


/**
* Get max height of tree
* @param {object} treeRoot - root record
* @return {int} max height
*/
const getMaxHeight = createSelector(
	[ getTreeRootRecord ],
	(treeRoot) => (treeRoot['maxHeight'])
)





/**
* Get color scale for cluster height
* @param {int} maxHeight
* @return {scale} d3 scale
*/ 
export const getClusterColorScale = createSelector(
	[ getMaxHeight ],
	(maxHeight) => scaleLinear().domain([0, maxHeight])
					 .range(config['treeClusterColorGradient'])
)









/**
* Gets offset index distance - the number of indices to remove at the end for branch/cluster spacing
* @param {int} indPerPx
* @return {int}
*/
export const getOffsetIndex = createSelector(
	[ getIndicesPerPixel ],
	(indPerPx) => (indPerPx * config['treeClusterVerticalOffset'])
)


