/**
* Reducer for trees
*/

import { combineReducers } from 'redux'
import createReducer from '../createReducer.js'
import { types as actions } from 'state/actions/tree.js'



/**
* treeRoot {string}
* 	cell ID of the root node
*/


const initialTreeRoot = ''

const treeRoot = createReducer(initialTreeRoot)({
	[actions.fetchTreeRootSuccess]: (state, action) => (
		action.root['cellID']
	)
})



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
		const { children } = action.treeNode

		return { 
			...state, 
			[action.treeNode['cellID']]: nodeReducer(action.treeNode, children),
			...childrenToNodesReducer(children)
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
	root: treeRoot,
	nodes
})





/**
* State Selectors
*/

export const treeRootSelector = (state) => state.cells.tree.root
export const treeNodesSelector = (state) => state.cells.tree.nodes



export default tree