/**
* Selectors for common tree cellscape
*/


import { createSelector } from 'reselect'
import { treeConfig as config, heatmapConfig } from 'config/treeCellscape.js'

import { stateSelectors } from 'state/reducers/index.js'

const { 
	treeRootIDSelector,
	treeNodesSelector
} = stateSelectors 




/******************************************
* STATE TREE SELECTORS
*******************************************/

export const getTreeRootID = treeRootIDSelector
export const getTreeNodeRecords = treeNodesSelector





/******************************************
* DATA SELECTORS
*******************************************/

/**
* Gets tree root record
* @param {object} nodes - all node data
* @param {string} rootID
* @return {object} root record
*/
export const getTreeRootRecord = createSelector(
	[ getTreeNodeRecords, getTreeRootID ],
	(nodes, rootID) => (nodes[rootID])
)



/******************************************
* DRAWING SELECTORS
*******************************************/


/**
* Gets number of nodes contained in tree from root
* @param {object} treeRoot - root record
* @return {int} number of tree nodes
*/
export const getTotalIndexNum = createSelector(
	[ getTreeRootRecord ],
	(treeRoot) => (treeRoot['maxDescendantIndex'] + 1)
)



/**
* Gets ratio of heatmap indices per pixel
* @param {int} numNodes
* @return {int}
*/
export const getIndicesPerPixel = createSelector(
	[ getTotalIndexNum ],
	(numNodes) => (Math.max(1, Math.ceil(numNodes / config['height'])))
)




/**
* Gets number of indices that can fit per heatmap row
*/
export const getIndicesPerRow = createSelector(
	[ getIndicesPerPixel ],
	(indPerPx) => (indPerPx * config['heatmapRowHeight'])
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



