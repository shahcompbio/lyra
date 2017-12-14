/**
* Reducer for chromosome ranges
*/

import { combineReducers } from 'redux'
import createReducer from 'state/reducers/createReducer.js'
import { types as actions } from 'state/actions/treeCellscape.js'



/**
* order {array}
* 	list of all chromosomes names in sorted order
*/

const initialOrder = []
const order = createReducer(initialOrder)({
	[actions.fetchChromRangesSuccess]: (state, action) => (
		action.chromosomes.map((chrom) => chrom['chrom'])
	)
}) 


/**
* data {object}
* 	data.key {string} - chromosome name
*	data.value {object} - associated data
*/

const initialData = {}
const data = createReducer(initialData)({
	[actions.fetchChromRangesSuccess]: (state, action) => (
		action.chromosomes.reduce((map, chrom) => ({
			...map,
			[chrom['chrom']]: chrom
		}) ,{})
	)
})






/**
* chromosomes reducer
* 	- order
* 	- data
*/

const chromosomes = combineReducers({
	order,
	data
})



/**
* State Selectors
*/

export const chromosomesSelector = (state) => state.chromosomes
export const chromosomesDataSelector = (state) => state.chromosomes.data
export const chromosomesOrderSelector = (state) => state.chromosomes.order


export default chromosomes