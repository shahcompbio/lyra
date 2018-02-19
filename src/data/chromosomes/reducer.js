/**
 * Reducer for chromosome ranges
 */

import { combineReducers } from "redux";
import createReducer from "utils/createReducer.js";
import shiftSelectors from "utils/shiftSelectors.js";
import actions from "./types.js";

/**
 * order {array}
 * 	list of all chromosomes names in sorted order
 */

const initialOrder = [];
const order = createReducer(initialOrder)({
	[actions.fetchChromRangesSuccess]: (state, action) =>
		action.chromosomes.map(chrom => chrom["chrom"])
});

/**
 * data {object}
 * 	data.key {string} - chromosome name
 *	data.value {object} - associated data
 */

const initialData = {};
const data = createReducer(initialData)({
	[actions.fetchChromRangesSuccess]: (state, action) =>
		action.chromosomes.reduce(
			(map, chrom) => ({
				...map,
				[chrom["chrom"]]: chrom
			}),
			{}
		)
});

/**
 * chromosomes reducer
 * 	- order
 * 	- data
 */

const reducer = combineReducers({
	order,
	data
});

/**
 * State Selectors
 */

const chromosomesDataSelector = state => state.data;
const chromosomesOrderSelector = state => state.order;

const chromosomesDataStateSelectors = {};
const chromosomesOrderStateSelectors = {};

export const stateSelectors = {
	chromosomesDataSelector: chromosomesDataSelector,
	chromosomesOrderSelector: chromosomesOrderSelector,
	...shiftSelectors(chromosomesDataSelector, chromosomesDataStateSelectors),
	...shiftSelectors(chromosomesOrderSelector, chromosomesOrderStateSelectors)
};

export default reducer;
