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
	max_depth: 'maxDepth'
}


export const MAPPINGS = {
	...TREE_MAPPINGS
}



/**
* Configuration defaults for views
*/

const CONFIG_CONSTANTS = {
	width: 400,
	height: 1000,

	heatmapRowHeight: 5,


	treeNodeColor: "#A3A3A3",
	treeBranchColor: "#CECECE",
	treeCladeColor: "#A3A3A3",

	treeCladeColorGradient: ["#CECECE", "#000000"],

	treeBranchWidth: 2,

	treeDepthSpacing: 50

}

export const config = {
	...CONFIG_CONSTANTS,
	treeNodeRadius: 3,
	treeCladeWidth:  CONFIG_CONSTANTS.treeDepthSpacing - 10

}