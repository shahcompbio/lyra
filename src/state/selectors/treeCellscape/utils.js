/**
* Selectors for common tree cellscape
*/


import { createSelector } from 'reselect'


import { treeConfig, heatmapConfig } from 'config/treeCellscape.js'

import { stateSelectors } from 'state/reducers/index.js'

const { 
	treeRootIDSelector,
	treeDataSelector,

	uiHighlightedSelector,
	indexToIDSelector
} = stateSelectors 




/******************************************
* STATE TREE SELECTORS
*******************************************/

export const getTreeRootID = treeRootIDSelector
export const getTreeNodeRecords = treeDataSelector


export const getHighlightedIndex = uiHighlightedSelector
const getIndexToIDMapping = indexToIDSelector



/******************************************
* DATA SELECTORS
*******************************************/

/**
* Gets tree root record
*/
export const getTreeRootRecord = createSelector(
	[ getTreeNodeRecords, getTreeRootID ],
	// (object, string) => object
	(nodes, rootID) => (nodes[rootID])
)




/******************************************
* DRAWING SELECTORS
*******************************************/


/**
* Gets number of nodes contained in tree from root
*/
export const getTotalIndexNum = createSelector(
	[ getTreeRootRecord ],
	// object => int
	(treeRoot) => (treeRoot['maxDescendantIndex'] + 1)
)



/**
* Gets ratio of heatmap indices per pixel
*/
export const getIndicesPerPixel = createSelector(
	[ getTotalIndexNum ],
	// int => int
	(numNodes) => (Math.max(1, Math.ceil(numNodes / treeConfig['height'])))
)




/**
* Gets number of indices that can fit per heatmap row
*/
export const getIndicesPerRow = createSelector(
	[ getIndicesPerPixel ],
	// int => int
	(indPerPx) => (indPerPx * heatmapConfig['rowHeight'])
)


/**
* Gets threshold index distance - the number of indices apart children have to be in order to be visible
* @param {int} indPerPx
* @return {int}
*/
export const getThresholdIndex = createSelector(
	[ getIndicesPerRow ],
	// int => int
	(indPerRow) => (indPerRow * 4)
)



/******************************************
* HIGHLIGHTED CELLS SELECTORS
*******************************************/

export const getHighlightedCellID = createSelector(
	[ getHighlightedIndex, getIndexToIDMapping ],
	(index, indexToID) => (indexToID[index])
)


export const makeIsIndexHighlighted = () => createSelector(
	[ getHighlightedIndex, (state, index) => index ],
	(highlightedIndex, index) => (highlightedIndex === index)
)
