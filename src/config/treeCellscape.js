/**
* TreeCellscape dashboard configuration
*/


import { scaleOrdinal, scaleLinear } from 'd3'

/**
* Mappings for columns for ElasticSearch to redux store
*/
const TREE_MAPPINGS = {
	cell_id: 'cellID',
	heatmap_order: 'heatmapIndex',
	children: 'children',
	parent: 'parent',
	max_height: 'maxHeight',
	min_index: 'minDescendantIndex',
	max_index: 'maxDescendantIndex'
}

const SEG_MAPPINGS = {
	cell_id: 'cellID',
	start: 'start',
	end: 'end',
	chrom_number: 'chromosome',
	state: 'state',
	'integer_median': 'integerMedian'
}
export const MAPPINGS = {
	...TREE_MAPPINGS,
	...SEG_MAPPINGS
}



/**
* Configuration defaults for views
*/

	/**
	* Overall config
	*/

const CONSTANTS = {
	width: 1500,
	height: 2000
}

export const config = {
	...CONSTANTS
}


	/**
	* Tree-related config
	*/

const TREE_CONSTANTS = {
	width: 800,
	height: 1000,

	treeNodeRadius: 3,
	treeNodeColor: "#b3b3b3",
	treeBranchColor: "#000000",
	treeHorizontalBranchColor: "#b3b3b3",
	treeClusterColor: "#A3A3A3",

	treeClusterColorGradient: ["#CECECE", "#CECECE"],

	treeBranchWidth: 4,

	treeHorizontalBranchWidth: 1,
	treeVerticalBranchWidth: 4,

	treeDepthSpacing: 30,

	treeClusterVerticalOffset: 5

}

export const treeConfig = {
	...TREE_CONSTANTS,
	treeClusterWidth:  TREE_CONSTANTS.treeDepthSpacing - TREE_CONSTANTS.treeNodeRadius

}


	/**
	* Heatmap-related config
	*/


const HEATMAP_CONSTANTS = {
	rowHeight: 5,
	indicatorWidth: 10
}

export const heatmapConfig = {

	...HEATMAP_CONSTANTS,

	totalWidth: config.width - treeConfig.width,
	contentWidth: config.width - treeConfig.width - HEATMAP_CONSTANTS.indicatorWidth,
	height: config.height,
	x: treeConfig.width,
	colorScale: scaleOrdinal()
				.domain([1,2,3,4,5,6,7]) // state
				.range(["#2e7aab", "#73a9d4", "#D6D5D5", "#fec28b", "#fd8b3a", "#ca632c", "#954c25"])
}




/**
* Gets x position for tree component given some depth
* @param {int} depth
* @return {int}
*/
export const getTreeXPosition = (depth) => (
	(depth * treeConfig.treeDepthSpacing) + treeConfig.treeNodeRadius
)


