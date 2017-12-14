/**
* Reducer for segs
*/

import { combineReducers } from 'redux'
import createReducer from '../createReducer.js'
import { types as actions } from 'state/actions/treeCellscape.js'




/**
* pending {array}
*    all indices that are currently being fetched
*/

const initialPending = []
const pending = createReducer(initialPending)({
	[actions.fetchSegs]: (state, action) => {
		const indicesToAdd = action['indices'].filter((index) => !state.includes(index))

		return indicesToAdd.length > 0 ? mergeInOrder(state, indicesToAdd) : state

	},

	[actions.fetchSegsSuccess]: (state, action) => {
		const indicesToRemove = action.indices

		return indicesToRemove.length > 0 ? removeInOrder(state, indicesToRemove) : state
	}
})


		/**
		* Takes current state and new list and merges them in order of increasing indices
		* ASSUMES: both lists are already sorted by ascending order
		*/
		const mergeInOrder = (state, list) => {
			if (state.length === 0) {
				return list
			}

			else if (list.length === 0) {
				return state
			}

			else {
				const [ firstList, ...restList ] = list
				const [ firstState, ...restState ] = state

				return firstList < firstState ? [ firstList, ...mergeInOrder(state, restList)]
												 : [ firstState,   ...mergeInOrder(restState, list)]
			}

		}




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
* data {object}
* 	data.key {int} - heatmap index
* 	data.value {array} - segments for that index
*/

const initialSegsData = {}
const data = createReducer(initialSegsData)({
	[actions.fetchSegsSuccess]: (state, action) => ({
		...state,
		...processSegsForIndices(action.segs, action.indices, action.ids)
	})

})

		/**
		*
		*/
		const processSegsForIndices = (segs, indices, ids) => {
			const IDToSegMap = createIDToSegMap(segs)
			return indices.reduce((map, index, arrayIndex) => ({
				...map,
				[index]: IDToSegMap[ids[arrayIndex]]
			}), {})

		}



		/**
		*
		*/
		const createIDToSegMap = (segs) => (
			segs.reduce((map, segment) => {
				const cellID = segment['cellID']
				const newSegments = map.hasOwnProperty(cellID) ?
							[ ...map[cellID], segment ] :
							[ segment ]

				return {
					...map,
					[cellID]: newSegments
				}
			}, {})
		)






/**
* Segs reducer
* - pending
* - data
*/
const segs = combineReducers({
	pending,
	data
})





/**
* State Selectors
*/

export const segsSelector = (state) => state.cells.segs
export const segsDataSelector = (state) => state.cells.segs.data
export const segsPendingSelector = (state) => state.cells.segs.pending

export default segs