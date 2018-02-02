/**
* Reducer for ui state
*/


import { combineReducers } from 'redux'
import createReducer from 'state/reducers/utils/createReducer.js'
import shiftSelectors from 'state/reducers/utils/shiftSelectors.js'
import { types as actions } from 'state/actions/treeCellscape.js'


/**
* elements {array}
* 	list of clusters and nodes in current tree
*    nodes as index
* 	 clusters as [minIndex, maxIndex]
*/

const initialElements = []

const elements = createReducer(initialElements)({
	[actions.fetchTreeRootSuccess]: (state, action) => (
		[ ...state, action.root['heatmapIndex'] ]
	),

	[actions.addTreeElements]: (state, action) => (
		mergeInOrder(state, extractIndicesFromElements(action.elements))
	),
	[actions.setTreeRoot]: (state, action) => (initialElements)
})
		/**
		* Takes list of elements (nodes and clusters) and returns list of indices
		* @param {array} elements
		* @return {array}
		*/
		const extractIndicesFromElements = (elements) => (
			elements.map((element) => (
				element.hasOwnProperty('cellID') ?
					element['heatmapIndex'] :
					[element['startIndex'], element['endIndex']]
			))
		)


		/**
		* Takes current state and new element list and merges them in order of increasing indices
		* ASSUMES: both lists are already sorted by ascending order
		*/
		const mergeInOrder = (state, elements) => {
			if (state.length === 0) {
				return elements
			}

			else if (elements.length === 0) {
				return state
			}

			else {
				const [ firstElement, ...restElements ] = elements
				const [ firstState, ...restState ] = state

				const elementIndex = isNode(firstElement) ? firstElement : firstElement[0]
				const stateIndex = isNode(firstState) ? firstState : firstState[0]

				return elementIndex < stateIndex ? [ firstElement, ...mergeInOrder(state, restElements)]
												 : [ firstState,   ...mergeInOrder(restState, elements)]
			}

		}



		/**
		* Determines whether object is a node (true) or cluster (false)
		*/
		const isNode = (item) => (Number.isInteger(item))




/**
* treeRootPath { array }
* 	list of tree roots we've zoomed into so far to get to current tree root
*/
const initialTreeRootPath = []
const treeRootPath = createReducer(initialTreeRootPath)({
	[actions.fetchTreeRootSuccess]: (state, action) => ([action.root['cellID'], ...state]),
	[actions.setTreeRoot]: (state, action) => ([action.nodeID, ...state]),
	[actions.unsetTreeRoot]: (state, action) => {
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


const uiElementsSelector = state => state.elements
const uiHighlightedIndexSelector = state => state.highlightedIndex
const uiHighlightedRangeSelector = state => state.highlightedRange
const uiTreeRootPathSelector = state => state.treeRootPath

const uiElementsStateSelectors = {}
const uiHighlightedIndexStateSelectors = {}
const uiHighlightedRangeStateSelectors = {}
const uiTreeRootPathStateSelectors = {}


export const stateSelectors = {
	//uiElementsSelector,
	uiHighlightedIndexSelector,
	uiHighlightedRangeSelector,
	uiTreeRootPathSelector,
	//...shiftSelectors(uiElementsSelector, uiElementsStateSelectors),
	...shiftSelectors(uiHighlightedIndexSelector, uiHighlightedIndexStateSelectors),
	...shiftSelectors(uiHighlightedRangeSelector, uiHighlightedRangeStateSelectors),
	...shiftSelectors(uiTreeRootPathSelector, uiTreeRootPathStateSelectors)
}

export default ui