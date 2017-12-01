/**
* TreeCellscape dashboard configuration
*/



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


export const MAPPINGS = {
	...TREE_MAPPINGS
}



/**
* Configuration defaults for views
*/

	/**
	* Overall config
	*/

const CONSTANTS = {
	width: 1200,
	height: 1000
}

export const config = {
	...CONSTANTS
}


	/**
	* Tree-related config
	*/

const TREE_CONSTANTS = {
	width: 800,
	height: CONSTANTS.height,

	heatmapRowHeight: 5,


	treeNodeRadius: 3,
	treeNodeColor: "#000000",
	treeBranchColor: "#000000",
	treeClusterColor: "#A3A3A3",

	treeClusterColorGradient: ["#CECECE", "#000000"],

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


export const getXPosition = (depth) => (
	(depth * treeConfig.treeDepthSpacing) + treeConfig.treeNodeRadius
)


