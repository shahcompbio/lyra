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

	[actions.fetchTreeNodeSuccess]: (state, action) => ([
		...removeInOrder(state, action.nodeIDs)
	])
})

		/**
		*
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

	[actions.fetchTreeNodeSuccess]: (state, action) => {
		const { treeNode } = action

		const treeNodeMap = treeNode.reduce((map, record) => ({
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
		* Normalizes children into list of IDs and flat object of nodes
		*/
		const nodeReducer = (node, children) => ({
			...node,
			children: children.map((child) => (child['cellID']))
		})

		const childrenToNodesReducer = (children) => (
			children.reduce((nodes, child) => {
				return {
					...nodes,
					[child['cellID']]: child
				}
				}, {})
		)



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