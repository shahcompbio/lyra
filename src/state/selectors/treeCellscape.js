/**
* Selectors for Tree Cellscape
*/


import { stateSelectors } from 'state/reducers/index.js'

const { 
	treeRootIDSelector,
	treePendingSelector,
	segsPendingSelector,
	uiHighlightedSelector
} = stateSelectors

/******************************************
* TREE SELECTORS
*******************************************/

/** 
*	Gets cell ID of tree root
*	@return {string}
*/
export const getTreeRootID = treeRootIDSelector



/** 
*	Gets list of cell IDs that are getting tree records fetched
*	@return {array}
*/ 
export const getTreePending = treePendingSelector


export {
	/** 
	*	Factory function - gets tree record for specific cell ID
	*	@return {func} ( , {string}) => {object}
	*/
	makeGetTreeNodeRecordByID,

	/** 
	*	Factory function - gets summary list (nodes and clusters) of tree's (by cell ID) children
	*	@return {func} ( , {array}) => {array}
	*/	
	makeGetTreeChildrenSummary,


	/** 
	*	Gets heatmap index to y-coordinate scale
	*	@return {func} {int} => {int}
	*/	
	getYScale as getTreeYScale,


	/** 
	*	Gets color scale for cluster height
	*	@return {func} {int} => {color}
	*/	
	getClusterColorScale,


	/** 
	*	Gets offset index distance - the number of indices to remove at the end for branch/cluster spacing
	*	@return {int}
	*/	
	getOffsetIndex

} from './treeCellscape/tree.js'

/******************************************
* HEATMAP SELECTORS
*******************************************/

/** 
*	Gets list of heatmap indices that are getting segment records fetched
*	@return {array}
*/
export const getSegsPending = segsPendingSelector

export {
	/** 
	*	Gets all segment records for heatmap indices that are displayed and currently have data
	*	@return {array}
	*/
	getHeatmapSegData,

	/** 
	*	Gets list of heatmap indices that are displayed and do not have segment records
	*	@return {array}
	*/ 
	getMissingSegIndices,

	/** 
	*	Gets heatmap index to y-coordinate scale for heatmap
	*	@return {func} {int} => {int}
	*/
	getYScale as getHeatmapYScale,

	/** 
	*	Gets cell IDs given heatmap indices
	*	@return {array}
	*/
	getIDsByIndex,

	/** 
	*	Gets indices that do not have a cell ID mapping yet
	*	@return {array}
	*/
	getMissingIDMappings,

	/** 
	*	Gets base pair to pixel ratio
	*	@return {int}
	*/
	getBPRatio,

	/** 
	*	Gets chromosome range data in order
	*	@return {array}
	*/
	getChromRanges,

	/** 
	*	Gets the chromosome to start pixel mapping
	*	@return {object}
	*/
	getChromPixelMapping

} from './treeCellscape/heatmap.js'




/******************************************
* UNIVERSAL SELECTORS
*******************************************/

/**
* Gets index or index range of highlighted cells
* @return {null || int || array}
*/
export const getHighlightedIndex = uiHighlightedSelector

export  {
	getHighlightedCellID


} from './treeCellscape/utils.js'