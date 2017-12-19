/**
* Reducer for trees
*/

import { combineReducers } from 'redux'
import createReducer from '../createReducer.js'
import { types as actions } from 'state/actions/treeCellscape.js'



/**
* rootID {string}
* 	cell ID of the root node
*/


const initialTreeRootID = ''

const rootID = createReducer(initialTreeRootID)({
	[actions.fetchTreeRootSuccess]: (state, action) => (
		action.root['cellID']
	)
})


/**
* pending {array}
* 	all cellIDs that are currently being fetched
*/

const initialPending = []
const pending = createReducer(initialPending)({
	[actions.fetchTreeNode]: (state, action) => ([
		...state,
		action.nodeID
	]),

	[actions.fetchTreeNodesSuccess]: (state, action) => ([
		...removeInOrder(state, action.nodeIDs)
	])
})

		/**
		* Remove all elements in list from state
		* ASSUME: lists are ordered in same way
		* @param {array} state
		* @param {array} list
		* @return {array}
		*/
		const removeInOrder = (state, list) => {
			if (list.length === 0) {
				return list
			}
			else {
				const [ firstList, ...restList ] = list
				const [ firstState, ...restState ] = state

				return firstList === firstState ? [ ...removeInOrder(restState, restList) ]
												: [ firstState, ...removeInOrder(restState, list)]
			}
		}




/**
* nodes {object}
* 	nodes.key {string} - cell ID of node
* 	nodes.value {object} - record of node
*/

const initialNodes = {}

const nodes = createReducer(initialNodes)({
	[actions.fetchTreeRootSuccess]: (state, action) => {
		const { children, ...otherRootProps } = action.root

		return {
			...state,
			[action.root['cellID']]: otherRootProps
		}
	},

	[actions.fetchTreeNodesSuccess]: (state, action) => {
		const { treeNodes } = action

		const treeNodeMap = treeNodes.reduce((map, record) => ({
			...map,
			[record['cellID']]: record
		}), {})

		return {
			...state,
			...treeNodeMap
		}
	}
})



/**
* Tree reducer
* - treeRoot {string}
* - nodes {object}
*/
const tree = combineReducers({
	rootID,
	nodes,
	pending
})





/**
* State Selectors
*/

export const treeRootIDSelector = (state) => state.cells.tree.rootID
export const treeNodesSelector = (state) => state.cells.tree.nodes
export const treePendingSelector = (state) => state.cells.tree.pending



export default tree