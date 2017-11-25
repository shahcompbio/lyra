/**
* Selectors for Tree Cellscape
*/


import { createSelector } from 'reselect'
import { treeRootIDSelector, treeNodesSelector } from 'state/reducers/cells/tree.js'
import { treeConfig as config } from 'config/treeCellscape.js'
import { scaleLinear } from 'd3'



import { uiSummarySelector } from 'state/reducers/ui.js'


/**
* Simple getters for state tree
*/
export const getTreeRootID = treeRootIDSelector
export const getTreeNodes = treeNodesSelector




/**
* Gets tree root record
* @param {object} nodes - all node data
* @param {string} rootID
* @return {object} root record
*/
const getTreeRootRecord = createSelector(
	[ getTreeNodes, getTreeRootID ],
	(nodes, rootID) => (nodes[rootID])
)


/**
* Gets number of nodes contained in tree from root
* @param {object} treeRoot - root record
* @return {int} number of tree nodes
*/
const getTotalIndexNum = createSelector(
	[ getTreeRootRecord ],
	(treeRoot) => (treeRoot['numSuccessors'] + 1)
)


/**
* Gets ratio of heatmap indices per pixel
* @param {int} numNodes
* @return {int}
*/
const getIndicesPerPixel = createSelector(
	[ getTotalIndexNum ],
	(numNodes) => (Math.max(1, Math.ceil(numNodes / config['height'])))
)


/**
* Gets threshold index distance - the number of indices apart children have to be in order to be visible
* @param {int} indPerPx
* @return {int}
*/
export const getThresholdIndex = createSelector(
	[ getIndicesPerPixel ],
	(indPerPx) => (indPerPx * config['heatmapRowHeight'])
)



/**
* Get yScale (index to pixel)
* @param {int} numNodes
* @return {scale} d3 scale
*/
export const getYScale = createSelector(
	[ getTotalIndexNum ],
	(numNodes) => (
		scaleLinear().domain([0, numNodes - 1])
					 .range([0, config['height']])
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
* Get shallow tree node records given list of IDs
* @param {array} ids
* @return {array} records 
*/
const getTreeNodeRecords = createSelector(
	[ getTreeNodes, (state, ids) => (ids) ],
	(nodes, ids) => (ids.map(nodeID => {
		const { heatmapIndex, maxHeight, cellID } = nodes[nodeID]
		return { heatmapIndex, maxHeight, cellID }
	}))
)

/**
* Selectors for specific React components
*/


/**
* Factory function for TreeNode React component, to get an entire tree node record given ID
* @return {func} selector
*	@param {object} state
* 	@param {string} id
*	@return {object || null} record of nodeID, null if not full record
*/
export const makeGetTreeNodeRecord = () => (createSelector(
	[ getTreeNodes, (state, id) => id ],
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
* Factory function for TreeChildren React component, to get summary children list (clusters and nodes)
* @return {func} selector
*	@param {object} state
* 	@param {array} ids
*	@return {array} 
*/
export const makeGetTreeChildrenSummary = () => (createSelector(
	[ getTreeNodeRecords, getThresholdIndex ],
	summaryTreeChildren
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

		if (isLastNode(i, children) || isNodeDistanceExceedThreshold(i, children, thresholdIndex)) {
			// Already creating a cluster - merge current node to cluster and stop
			if (isClusterCreating(clusterDimensions)) {
				clusterDimensions = mergeNodeToCluster(clusterDimensions, currNode)

				summary = [ ...summary, { ...clusterDimensions } ]
				clusterDimensions = initializeCluster()
			}

			// Else add as normal node
			else {
				summary = [ ...summary, { ...currNode } ]
			}

		}
		else { // nodes are too close
			if (isClusterCreating(clusterDimensions)) {
				clusterDimensions = mergeNodeToCluster(clusterDimensions, currNode)
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
* Determines whether current index is at last node
* @param {int} i - current index
* @param {array} children
* @return {bool}
*/
const isLastNode = (i, children) => (
	i + 1 >= children.length
)

/**
* Determines whether index distance between i and i+1 child is above threshold
* @param {int} i - current i
* @param {array} children
* @param {int} threshold
* @return {bool}
*/
const isNodeDistanceExceedThreshold = (i, children, threshold) => (
	children[i+1]['heatmapIndex'] - children[i]['heatmapIndex'] > threshold
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
	startIndex: currNode['heatmapIndex'],
	endIndex: currNode['heatmapIndex'],
	maxHeight: currNode['maxHeight']
})

const mergeNodeToCluster = (clusterDimensions, currNode) => ({
	...clusterDimensions,
	endIndex: currNode['heatmapIndex'],
	maxHeight: Math.max(clusterDimensions['maxHeight'], currNode['maxHeight'])
})























/**
* HEATMAP SELECTORS
*/

const getUISummary = uiSummarySelector


export const getHeatmapIDs = createSelector(
	[ getUISummary ],
	(summary) => {
		const ids = summary.reduce(
						(ids, item) => (Array.isArray(item) ? [ ...ids, ...item ] : [ ...ids, item ]),
						[]
					)

		return ids
	}
)
