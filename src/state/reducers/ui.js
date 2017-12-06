/**
* Reducer for ui state
*/


import { combineReducers } from 'redux'
import createReducer from './createReducer.js'
import { types as actions } from 'state/actions/treeCellscape.js'


/**
* summary {array}
* 	list of clusters and nodes in current summary tree
*    nodes as index
* 	 clusters as [minIndex, maxIndex]
*/

const initialSummary = []

const summary = createReducer(initialSummary)({
	[actions.fetchTreeRootSuccess]: (state, action) => (
		[ ...state, action.root['heatmapIndex'] ]
	),

	[actions.addChildrenSummary]: (state, action) => (
		mergeInOrder(state, extractIndicesFromSummary(action.summary))
	)
})
		/**
		* Takes summary list (of objects) and returns list of indices
		* @param {array} summary
		* @return {array}
		*/
		const extractIndicesFromSummary = (summary) => (
			summary.map((item) => (
				item.hasOwnProperty('cellID') ?
					item['heatmapIndex'] :
					[item['startIndex'], item['endIndex']]
			))
		)


		/**
		* Takes current state and new summary list and merges them in order of increasing indices
		* ASSUMES: both lists are already sorted by ascending order
		*/
		const mergeInOrder = (state, summary) => {
			if (state.length === 0) {
				return summary
			}

			else if (summary.length === 0) {
				return state
			}

			else {
				const [ firstSummary, ...restSummary ] = summary
				const [ firstState, ...restState ] = state

				const summaryIndex = isNode(firstSummary) ? firstSummary : firstSummary[0]
				const stateIndex = isNode(firstState) ? firstState : firstState[0]

				return summaryIndex < stateIndex ? [ firstSummary, ...mergeInOrder(state, restSummary)]
												 : [ firstState,   ...mergeInOrder(restState, summary)]
			}

		}



		/**
		* Determines whether object is a node (true) or cluster (false)
		*/
		const isNode = (item) => (Number.isInteger(item))


/**
* UI reducer
* - summary {array}
*/
const ui = combineReducers({
	summary
})




/**
* State Selectors
*/

export const uiSummarySelector = (state) => state.ui.summary



export default ui