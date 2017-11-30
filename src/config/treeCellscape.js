/**
* TreeCellscape dashboard configuration
*/



/**
* Mappings for columns for ElasticSearch to redux store
*/
const TREE_MAPPINGS = {
	cell_id: 'cellID',
	num_nodes: 'numSuccessors',
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


	treeNodeColor: "#A3A3A3",
	treeBranchColor: "#CECECE",
	treeClusterColor: "#A3A3A3",

	treeClusterColorGradient: ["#CECECE", "#000000"],

	treeBranchWidth: 2,

	treeDepthSpacing: 30

}

export const treeConfig = {
	...TREE_CONSTANTS,
	treeNodeRadius: 3,
	treeClusterWidth:  TREE_CONSTANTS.treeDepthSpacing - 10

}


export const getXPosition = (depth) => (
	(depth * treeConfig.treeDepthSpacing) + treeConfig.treeNodeRadius
)


