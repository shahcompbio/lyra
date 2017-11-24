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
		[ ...state, ...extractIndicesFromSummary(action.summary)]
	)
})

		/**
		* Takes summary list (of objects) and returns list of indices
		*/
		const extractIndicesFromSummary = (summary) => (
			summary.map((item) => (
				isNode(item) ?
					item['heatmapIndex'] :
					[item['startIndex'], item['endIndex']]
			))
		)


		/**
		* Determines whether object is a node (true) or cluster (false)
		*/
		const isNode = (item) => (item.hasOwnProperty('cellID'))


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