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
	)
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
* highlightedIndex {null || int || array}
* 	index or indices of element that is being hovered upon
* 	NOTE: array is just [min, max]
*/

const initialHighlightedIndex = null
const highlightedIndex = createReducer(initialHighlightedIndex)({
	[actions.highlightIndex]: (state, action) => (action.index),
	[actions.unhighlightIndex]: (state, action) => (null)
})




/**
* UI reducer
* - elements {array}
* - highlighted { null || int || array }
*/
const ui = combineReducers({
	elements,
	highlightedIndex
})




/**
* State Selectors
*/


const uiElementsSelector = state => state.elements
const uiHighlightedIndexSelector = state => state.highlightedIndex

const uiElementsStateSelectors = {}
const uiHighlightedIndexStateSelectors = {}


export const stateSelectors = {
	uiElementsSelector,
	uiHighlightedIndexSelector,
	...shiftSelectors(uiElementsSelector, uiElementsStateSelectors),
	...shiftSelectors(uiHighlightedIndexSelector, uiHighlightedIndexStateSelectors)
}

export default ui