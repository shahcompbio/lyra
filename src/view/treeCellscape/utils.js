// Tree Cellscape utils
import { scaleLinear } from 'd3'


const MAPPINGS = {
	cell_id: 'cellID',
	num_nodes: 'numSuccessors',
	heatmap_order: 'heatmapIndex',
	children: 'children'
}

const CONFIG_CONSTANTS = {
	width: 400,
	height: 1000,

	heatmapRowHeight: 5,


	treeNodeColor: "#A3A3A3",
	treeBranchColor: "#CECECE",
	treeCladeColor: "#A3A3A3",

	treeBranchWidth: 2,

	treeDepthSpacing: 50

}

export const config = {
	...CONFIG_CONSTANTS,
	treeNodeRadius: 3,
	treeCladeWidth:  CONFIG_CONSTANTS.treeDepthSpacing - 10

}



export const getIndicesPerPixel = (numNodes) => (
	Math.max(1, Math.ceil(numNodes / config.height))
)


export const getThresholdIndex = (numNodes) => {
	const indicesPerPx = getIndicesPerPixel(numNodes)
	return indicesPerPx * config.heatmapRowHeight
}

// NOTE: this doesn't work with non-root nodes... you need to make sure that when you get y position, you also subtract the index of the rooted node
export const getYScale = (numNodes) => (
	scaleLinear().domain([0, numNodes - 1])
				 .range([0, config.height])
)

export const getIndexToYConverter = (numNodes, rootIndex) => {
	const yScale = getYScale(numNodes)

	return (i) => (yScale(i - rootIndex))
}


export const getXPosition = (depth) => (
	(depth * config.treeDepthSpacing) + config.treeNodeRadius
)