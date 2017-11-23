/**
* Selectors for Tree Cellscape
*/


import { createSelector } from 'reselect'
import { treeRootIDSelector, treeNodesSelector } from 'state/reducers/cells/tree.js'
import { treeConfig as config } from 'config/treeCellscape.js'
import { scaleLinear } from 'd3'



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
* Get color scale for clade height
* @param {int} maxHeight
* @return {scale} d3 scale
*/ 
export const getCladeColorScale = createSelector(
	[ getMaxHeight ],
	(maxHeight) => scaleLinear().domain([0, maxHeight])
					 .range(config['treeCladeColorGradient'])
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
* Factory function for TreeChildren React component, to get aggregate children list (clades and nodes)
* @return {func} selector
*	@param {object} state
* 	@param {array} ids
*	@return {array} 
*/
export const makeGetTreeChildrenAggregations = () => (createSelector(
	[ getTreeNodeRecords, getThresholdIndex ],
	aggregateTreeChildren
))


/**
* Aggregate children, based on whether distance between siblings is greater than threshold
* @param {array} children
* @param {int} thresholdIndex
* @return {array} list of clades and nodes
*/
const aggregateTreeChildren = (children, thresholdIndex) => {
	let cladeDimensions = initializeClade()
	let i = 0

	let aggregations = []

	while (i < children.length) {
		const currNode = children[i]

		if (isLastNode(i, children) || isNodeDistanceExceedThreshold(i, children, thresholdIndex)) {
			// Already aggregating a clade - merge current node to clade and stop
			if (isCladeAggregating(cladeDimensions)) {
				cladeDimensions = mergeNodeToClade(cladeDimensions, currNode)

				aggregations = [ ...aggregations, { ...cladeDimensions } ]
				cladeDimensions = initializeClade()
			}

			// Else add as normal node
			else {
				aggregations = [ ...aggregations, { ...currNode } ]
			}

		}
		else { // nodes are too close
			if (isCladeAggregating(cladeDimensions)) {
				cladeDimensions = mergeNodeToClade(cladeDimensions, currNode)
			}
			else {
				cladeDimensions = startCladeDrawing(currNode)
			}
		}

		i++
	}

	return aggregations
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
* cladeDimesions {object}
* 	cladeDimensions.isAgg {bool} - whether clade is current aggregating
* 	cladeDimensions.startIndex {int}
*	cladeDimensions.endIndex {int}
* 	cladeDimensions.maxHeight {int} - tallest branch so far
*/
const initializeClade = () => ({
	isAgg: false
})

const isCladeAggregating = (cladeDimensions) => (
	cladeDimensions.isAgg
)

const startCladeDrawing = (currNode) => ({
	isAgg: true,
	startIndex: currNode['heatmapIndex'],
	endIndex: currNode['heatmapIndex'],
	maxHeight: currNode['maxHeight']
})

const mergeNodeToClade = (cladeDimensions, currNode) => ({
	...cladeDimensions,
	endIndex: currNode['heatmapIndex'],
	maxHeight: Math.max(cladeDimensions['maxHeight'], currNode['maxHeight'])
})

