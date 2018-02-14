/**
* Reducer for ui state
*/


import { combineReducers } from 'redux'
import createReducer from 'state/reducers/utils/createReducer.js'
import shiftSelectors from 'state/reducers/utils/shiftSelectors.js'
import { types as actions } from 'state/actions/treeCellscape.js'



/**
* treeRootPath { array }
* 	list of tree roots we've zoomed into so far to get to current tree root
*/
const initialTreeRootPath = []
const treeRootPath = createReducer(initialTreeRootPath)({
	[actions.fetchTreeRootSuccess]: (state, action) => ([action.root['cellID'], ...state]),
	[actions.setTreeRoot]: (state, action) => ([action.nodeID, ...state]),
	[actions.unsetTreeRoot]: (state, action) => {
		// eslint-disable-next-line
		const [ firstRoot, ...restRoot ] = state
		return restRoot
	}
})






/**
* highlightedIndex { null || int }
* 	index of node or heatmap row that is being hovered on
*/

const initialHighlightedIndex = null
const highlightedIndex = createReducer(initialHighlightedIndex)({
	[actions.highlightElement]: (state, action) => (action.index === undefined ? null : action.index),
	[actions.unhighlightElement]: (state, action) => (null),
	[actions.setTreeRoot]: (state, action) => (null),
	[actions.unsetTreeRoot]: (state, action) => (null)
})




/**
* highlightedRange { null || array }
*	[min, max] range of indices that is being hovered on
*/

const initialHighlightedRange = null
const highlightedRange = createReducer(initialHighlightedRange)({
	[actions.highlightElement]: (state, action) => (action.range === undefined ? null : action.range),
	[actions.unhighlightElement]: (state, action) => (null),
	[actions.setTreeRoot]: (state, action) => (null),
	[actions.unsetTreeRoot]: (state, action) => (null)
})



/**
* UI reducer
* - elements {array}
* - highlightedIndex { null || int }
* - highlightedRange { null || array }
*/
const ui = combineReducers({
	highlightedIndex,
	highlightedRange,
	treeRootPath
})




/**
* State Selectors
*/

const uiHighlightedIndexSelector = state => state.highlightedIndex
const uiHighlightedRangeSelector = state => state.highlightedRange
const uiTreeRootPathSelector = state => state.treeRootPath

const uiHighlightedIndexStateSelectors = {}
const uiHighlightedRangeStateSelectors = {}
const uiTreeRootPathStateSelectors = {}


export const stateSelectors = {
	uiHighlightedIndexSelector,
	uiHighlightedRangeSelector,
	uiTreeRootPathSelector,
	...shiftSelectors(uiHighlightedIndexSelector, uiHighlightedIndexStateSelectors),
	...shiftSelectors(uiHighlightedRangeSelector, uiHighlightedRangeStateSelectors),
	...shiftSelectors(uiTreeRootPathSelector, uiTreeRootPathStateSelectors)
}

export default ui