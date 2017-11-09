import { combineReducers } from 'redux'
import createReducer from './createReducer.js'
import { types as actions } from '../actions/tree.js'

const treeRoot = createReducer('')({
	[actions.fetchRootSuccess]: (state, action) => (
		action.root['cellID']
	)
})

const nodes = createReducer({})({

	[actions.fetchRootSuccess]: (state, action) => {
		const { children, ...otherRootProps } = action.root
		
		return {
			...state,
			[action.root['cellID']]: otherRootProps
		}
	},


	[actions.fetchTreeNodeSuccess]: (state, action) => (
		{ ...state, 
			 [action.treeNode['cellID']]: action.treeNode
		}
	)
})

const tree = combineReducers({
	root: treeRoot,
	nodes
})





// Selectors


const treeRootSelector = (state) => (state.cells.tree.root)
const treeNodesSelector = (state) => (state.cells.tree.nodes)


export const treeRootDataSelector = (state) => {
	const treeRoot = treeRootSelector(state)

	return treeRoot !== ""
		? { treeRoot, ...treeNodesSelector(state)[treeRoot] }
		: { treeRoot }
}

export const numNodesSelector = (state) => {
	const treeRoot = treeRootSelector(state)

	return treeNodesSelector(state)[treeRoot]['numSuccessors']
}



export const treeNodeSelector = (state, nodeID) => {
	const nodes = treeNodesSelector(state)

	return nodeHasAllData(nodes, nodeID) ? nodes[nodeID] : null
}

const nodeHasAllData = (nodes, nodeID) => (
	nodes.hasOwnProperty(nodeID) && nodes[nodeID].hasOwnProperty('children')
)

export default tree