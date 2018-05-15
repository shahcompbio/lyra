import { combineReducers } from "redux";
import createReducer from "utils/createReducer.js";
import actions from "./types.js";

/**
 * highlightedIndex { null || int }
 * 	index of node or heatmap row that is being hovered on
 */

export const initialIndex = null;
export const index = createReducer(initialIndex)({
  [actions.highlightElement]: (state, action) =>
    action.index === undefined ? null : action.index,
  [actions.unhighlightElement]: (state, action) => null
});

/**
 * highlightedRange { null || array }
 *	[min, max] range of indices that is being hovered on
 */

export const initialRange = null;
export const range = createReducer(initialRange)({
  [actions.highlightElement]: (state, action) =>
    action.range === undefined ? null : action.range,
  [actions.unhighlightElement]: (state, action) => null
});

/**
 * element { null || string }
 *   type of element that is highlighted
 */

export const initialElement = null;
export const element = createReducer(initialElement)({
  [actions.highlightElement]: (state, action) => action.element,
  [actions.unhighlightElement]: (state, action) => null
});

const reducer = combineReducers({
  index,
  range,
  element
});

/**
 * State Selectors
 */

const getHighlightedIndex = state => state.index;
const getHighlightedRange = state => state.range;
const getHighlightedElement = state => state.element;

export const stateSelectors = {
  getHighlightedIndex,
  getHighlightedRange,
  getHighlightedElement
};

export default reducer;
