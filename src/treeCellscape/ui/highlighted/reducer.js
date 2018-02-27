import { combineReducers } from "redux";
import createReducer from "utils/createReducer.js";
import actions from "./types.js";

import shiftSelectors from "utils/shiftSelectors.js";

/**
 * highlightedIndex { null || int }
 * 	index of node or heatmap row that is being hovered on
 */

const initialIndex = null;
const index = createReducer(initialIndex)({
  [actions.highlightElement]: (state, action) =>
    action.index === undefined ? null : action.index,
  [actions.unhighlightElement]: (state, action) => null
});

/**
 * highlightedRange { null || array }
 *	[min, max] range of indices that is being hovered on
 */

const initalRange = null;
const range = createReducer(initalRange)({
  [actions.highlightElement]: (state, action) =>
    action.range === undefined ? null : action.range,
  [actions.unhighlightElement]: (state, action) => null
});

const reducer = combineReducers({
  index,
  range
});

/**
 * State Selectors
 */

const getHighlightedIndex = state => state.index;
const getHighlightedRange = state => state.range;

export const stateSelectors = {
  getHighlightedIndex,
  getHighlightedRange
};

export default reducer;
