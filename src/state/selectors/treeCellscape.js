/**
* Selectors for Tree Cellscape
*/


import { createSelector } from 'reselect'
import { treeRootSelector, treeNodesSelector } from 'state/reducers/cells/tree.js'
import { config } from 'config/treeCellscape.js'
import { scaleLinear } from 'd3'



/**
* Simple getters for state tree
*/
export const getTreeRootID = treeRootSelector
export const getTreeNodes = treeNodesSelector


/**
* Get entire tree node record
* @param {object} state
* @param {string} nodeID
* @return {object || null} record of nodeID, null if not full record
*/
export const getTreeNodeRecord = createSelector(
	[ getTreeNodes, (state, id) => id ],
	(nodes, id) => {
		const node = nodes[id]
		return isFullRecord(node) ? node : null
	}
)


/**
* Determines whether record is full (has child attributes)
* @param {object} node - record
* @return {bool}
*/
const isFullRecord = (node) => (node !== undefined && node.hasOwnProperty('children'))

/**
* Get all tree node records
* @param {object} state
* @param {array} nodeIDs
* @return {array} list of records with nodeID
*/
export const getTreeNodeRecords = createSelector(
	[ getTreeNodes, (state, ids) => (ids) ],
	(nodes, ids) => (ids.map(nodeID => (nodes[nodeID])))
)


/**
* 
*/
const getTreeRootRecord = createSelector(
	[ getTreeNodes, getTreeRootID ],
	(nodes, rootID) => (nodes[rootID])
)


/**
*
*/
const getTotalIndexNum = createSelector(
	[ getTreeRootRecord ],
	(treeRoot) => (treeRoot['numSuccessors'] + 1)
)


const getIndicesPerPixel = createSelector(
	[ getTotalIndexNum ],
	(numNodes) => (Math.max(1, Math.ceil(numNodes / config['height'])))
)


/**
*
*/
export const getThresholdIndex = createSelector(
	[ getIndicesPerPixel ],
	(indPerPx) => (indPerPx * config['heatmapRowHeight'])
)



/**
* Get yScale
*/
export const getYScale = createSelector(
	[ getTotalIndexNum ],
	(numNodes) => (
		scaleLinear().domain([0, numNodes - 1])
					 .range([0, config['height']])
	)
)



const getMaxHeight = createSelector(
	[ getTreeRootRecord ],
	(treeRoot) => (treeRoot['maxDepth'])
)

export const getCladeColorScale = createSelector(
	[ getMaxHeight ],
	(maxHeight) => scaleLinear().domain([0, maxHeight])
					 .range(config['treeCladeColorGradient'])
)



/**
*
*/
export const makeGetTreeNodeRecord = () => (createSelector(
	[ getTreeNodes, (state, id) => id ],
	(nodes, id) => {
		const node = nodes[id]
		return isFullRecord(node) ? node : null
	}
))



export const makeGetTreeNodeRecords = () => (createSelector(
	[ getTreeNodes, (state, ids) => (ids) ],
	(nodes, ids) => (ids.map(nodeID => {
		const { heatmapIndex, maxDepth, cellID } = nodes[nodeID]
		return { heatmapIndex, maxDepth, cellID }
	}))
))

/*
const makeMapStateForTreeNode = () => {
	const getTreeNode = makeGetTreeNode()
	const mapState = (state, ownProps) => ({
		treeNode: getTreeNodeRecord(state, ownProps.nodeID),
		yScale: getYScale(state)
	})
	return mapState
}*/