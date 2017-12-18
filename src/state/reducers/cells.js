/**
* Reducer for cells
*/

import { combineReducers } from 'redux'
import tree from './cells/tree.js'
import segs from './cells/segs.js'


import createReducer from './createReducer.js'
import { types as actions } from 'state/actions/treeCellscape.js'



/**
* Metadata - index to ID mapping
* indexToID {object}
* 	- .key {int} - heatmapIndex
* 	- .value {string} - cellID
*/

const initialIndexToID = {}
const indexToID = createReducer(initialIndexToID)({
	[actions.fetchTreeNodeSuccess]: (state, action) => ({
		...state,
		...createIndexToIDMapping(action.treeNode),
		...createChildrenIndexToIDMapping(action.treeNode['children'])
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
* Creates index to ID map for each child
* @param {array} children
* @return {object}
*/
const createChildrenIndexToIDMapping = (children) => (
	children.reduce((map, child) => ({
		...map,
		...createIndexToIDMapping(child)
	}), {})
)


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

export const indexToIDSelector = (state) => state.cells.indexToID



export default cells