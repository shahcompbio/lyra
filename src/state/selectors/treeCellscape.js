/**
* Selectors for Tree Cellscape
*/


import { createSelector } from 'reselect'
import { treeConfig as config, heatmapConfig } from 'config/treeCellscape.js'
import { scaleLinear, scalePoint } from 'd3'

import { stateSelectors } from 'state/reducers/index.js'

const { 
	chromosomesOrderSelector, 
	chromosomesDataSelector, 
	uiSummarySelector,
	segsDataSelector, 
	segsPendingSelector,
	indexToIDSelector, 
	treeRootIDSelector, 
	treeNodesSelector, 
	treePendingSelector
} = stateSelectors

/**
* Simple getters for state tree
*/
export const getTreeRootID = treeRootIDSelector
export const getTreeNodes = treeNodesSelector
export const getTreePending = treePendingSelector



const getUISummary = uiSummarySelector
const getSegsData = segsDataSelector
export const getSegsPending = segsPendingSelector
const getIndexToIDMapping = indexToIDSelector
const getChromOrder = chromosomesOrderSelector
const getChromData = chromosomesDataSelector



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
	(treeRoot) => (treeRoot['maxDescendantIndex'] + 1)
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
	(indPerPx) => (indPerPx * 4 * config['heatmapRowHeight'])
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
* Get shallow tree node records given list of IDs
* @param {array} ids
* @return {array} records 
*/
const getTreeNodeRecords = createSelector(
	[ getTreeNodes, (state, ids) => (ids) ],
	(nodes, ids) => (ids.map(nodeID => {
		const { heatmapIndex, maxHeight, cellID, minDescendantIndex, maxDescendantIndex } = nodes[nodeID]
		return { heatmapIndex, maxHeight, cellID, minDescendantIndex, maxDescendantIndex }
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























/**
* HEATMAP SELECTORS
*/

/**
* Gets number of indices that can fit per heatmap row
*/
const getIndicesPerRow = createSelector(
	[ getIndicesPerPixel ],
	(indPerPx) => (indPerPx * config['heatmapRowHeight'])
)


/**
* Gets subsampled list of indices to display on heatmap based on summary tree
*/
export const getHeatmapIDs = createSelector(
	[ getIndicesPerRow, getTotalIndexNum ],
	(indPerRow, totalIndices) => {
		const numRows = Math.floor( totalIndices / indPerRow )

		const ids = Array.from(Array(numRows), (_, x) => (x * indPerRow))

		return ids
	}
)



/**
* Gets list of indices that are to displayed on heatmap but do not have segment data in store
*/
export const getMissingSegIndices = createSelector(
	[ getHeatmapIDs, getSegsData ],
	(indices, segs) => (
		indices.filter((index) => (!segs.hasOwnProperty(index)))
	)

)


/**
* Gets heatmap segment if it exists
*/
export const getAllHeatmapSegData = createSelector(
	[ getHeatmapIDs, getSegsData ],
	(indices, segs) => (
		indices.filter(index => segs.hasOwnProperty(index))
		       .map(index => createSegment(segs[index], index))
	)
)

const createSegment = (seg, index) => ({
	cellID: seg[0]['cellID'],
	heatmapIndex: index,
	segs: seg
})








/**
* Filters for indices that do not have a cellID mapping yet
*/
export const getMissingIDMappings = createSelector(
	[ getIndexToIDMapping, (state, indices) => (indices) ],
	(indexToIDs, indices) => (
		indices.filter((index) => !indexToIDs.hasOwnProperty(index))
	)
)

/**
* Returns list of cellIDs given list of heatmap indices
*/
export const getIDsByIndex = createSelector(
	[ getIndexToIDMapping, (state, indices) => (indices) ],
	(indexToIDs, indices) => (
		indices.map((index) => (indexToIDs[index]))
	)
)



/**
* Gets chromosome range data in order
*/
export const getChromRanges = createSelector(
	[ getChromOrder, getChromData ],
	(order, data) => (
		order.map((chrom) => data[chrom])
	)
)








/**
* Gets the total number of base pairs in chromosome ranges
*/
const getTotalBP = createSelector(
	[ getChromRanges ],
	(chromosomes) => (
		chromosomes.reduce((sum, chrom) => (sum + chrom.end - chrom.start + 1), 0)
	)
)

/**
* Gets the base pair to pixel ratio
*/
export const getBPRatio = createSelector(
	[ getTotalBP ],
	(totalBP) => (
		Math.ceil(totalBP / heatmapConfig.width)
	)
)

/**
* Gets the chromosome to start pixel mapping
*/
export const getChromPixelMapping = createSelector(
	[ getChromRanges, getBPRatio ],
	(chromosomes, bpRatio) => {
		let xShift = 0
		return chromosomes.reduce((map, chrom) => {
			const chromWidth = getChromWidth(chrom, bpRatio)

			const mapEntry = {
				x: xShift,
				width: chromWidth
			}

			xShift += chromWidth

			return {
				...map,
				[chrom.chrom]: mapEntry
			}
		}, {})
	}
)


/**
* Returns the width (in pixels) for chromosome
*/
const getChromWidth = (chrom, bpRatio) => (Math.floor((chrom.end - chrom.start + 1) / bpRatio))


/**
* Gets the heatmap (index) to pixel y scale
*/
export const getHeatmapYScale = createSelector(
	[ getHeatmapIDs ],
	(ids) => (scalePoint().domain(ids)
						  .range([0, ids.length * config.heatmapRowHeight]))
)