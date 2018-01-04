/**
* Selectors for Tree Cellscape
*/


import { stateSelectors } from 'state/reducers/index.js'

const { 
	treeRootIDSelector,
	treePendingSelector,
	segsPendingSelector
} = stateSelectors

/******************************************
* TREE SELECTORS
*******************************************/

export const getTreeRootID = treeRootIDSelector
export const getTreePending = treePendingSelector


export {
	makeGetTreeNodeRecord,
	makeGetTreeChildrenSummary,

	getYScale,
	getClusterColorScale,
	getOffsetIndex

} from './treeCellscape/tree.js'

/******************************************
* HEATMAP SELECTORS
*******************************************/


export const getSegsPending = segsPendingSelector

export {
	getAllHeatmapSegData,
	getMissingSegIndices,
	getHeatmapYScale,
	getIDsByIndex,
	getMissingIDMappings,
	getBPRatio,
	getChromRanges,
	getChromPixelMapping

} from './treeCellscape/heatmap.js'
