/**
* Reducer for cells
*/

import { combineReducers } from 'redux'

import createReducer from 'state/reducers/utils/createReducer.js'
import shiftSelectors from 'state/reducers/utils/shiftSelectors.js'
import { types as actions } from 'state/actions/treeCellscape.js'

import tree, { stateSelectors as treeStateSelectors } from './cells/tree.js'
import segs, { stateSelectors as segsStateSelectors } from './cells/segs.js'




/**
* Metadata - index to ID mapping
* indexToID {object}
* 	- .key {int} - heatmapIndex
* 	- .value {string} - cellID
*/

const initialIndexToID = {}
const indexToID = createReducer(initialIndexToID)({
	[actions.fetchTreeNodesSuccess]: (state, action) => ({
		...state,
		...createIndexToIDMappings(action.treeNodes)
	}),

	[actions.fetchIndexToIDMappingsSuccess]: (state, action) => ({
		...state,
		...createIndexToIDMappings(action.records)
	})
})


/**
* Creates index to ID mapping for given node
* @param {object} node
* @return {object}
*/
const createIndexToIDMapping = (node) => ({
	[node['heatmapIndex']]: node['cellID']
})



/**
* Creates index to ID mapping for nodes
* @param {array} nodes
* @return {object}
*/
const createIndexToIDMappings = (nodes) => (
	nodes.reduce((map, node) => ({
		...map,
		...createIndexToIDMapping(node)
	}), {})
)


/**
* Cell reducer
* - tree
*/
const cells = combineReducers({
	tree,
	segs,
	indexToID
})




/**
* State Selectors
*/


const treeSelector = state => state.tree
const segsSelector = state => state.segs
const indexToIDSelector = state => state.indexToID


const indexToIDStateSelectors = {}


export const stateSelectors = {
	treeSelector: treeSelector,
	segsSelector: segsSelector,
	indexToIDSelector: indexToIDSelector,
	...shiftSelectors(treeSelector, treeStateSelectors),
	...shiftSelectors(segsSelector, segsStateSelectors),
	...shiftSelectors(indexToIDSelector, indexToIDStateSelectors)
}



export default cells