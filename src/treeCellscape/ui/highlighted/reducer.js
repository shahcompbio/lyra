import { combineReducers } from "redux";
import createReducer from "utils/createReducer.js";
import actions from "./types.js";

/**
 * highlightedIndex { null || int }
 * 	index of node or heatmap row that is being hovered on
 */

const initialIndex = null;
const index = createReducer(initialHighlightedIndex)({
  [actions.highlightElement]: (state, action) =>
    action.index === undefined ? null : action.index,
  [actions.unhighlightElement]: (state, action) => null
});

/**
 * highlightedRange { null || array }
 *	[min, max] range of indices that is being hovered on
 */

const initalRange = null;
const range = createReducer(initialHighlightedRange)({
  [actions.highlightElement]: (state, action) =>
    action.range === undefined ? null : action.range,
  [actions.unhighlightElement]: (state, action) => null
});

const reducer = combineReducers({
  index,
  range
});

export default reducer;
