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

/**
 * chromosome { null || string }
 *   name of chromosome that is highlighted
 */

export const initialChromosome = null;
export const chromosome = createReducer(initialChromosome)({
  [actions.highlightChromosome]: (state, action) => action.chromosome,
  [actions.unhighlightElement]: (state, action) => null
});

export const initialData = {};
export const data = createReducer(initialData)({
  [actions.highlightElement]: (state, action) =>
    action.data === undefined ? null : action.data,
  [actions.unhighlightElement]: (state, action) => null
});

/**
 * Reducer
 */
const reducer = combineReducers({
  index,
  range,
  element,
  chromosome,
  data
});

/**
 * State Selectors
 */

const getHighlightedIndex = state => state.index;
const getHighlightedRange = state => state.range;
const getHighlightedElement = state => state.element;
const getHighlightedChromosome = state => state.chromosome;
const getHighlightedData = state => state.data;

export const stateSelectors = {
  getHighlightedIndex,
  getHighlightedRange,
  getHighlightedElement,
  getHighlightedChromosome,
  getHighlightedData
};

export default reducer;
