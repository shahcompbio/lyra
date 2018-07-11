import createReducer from "utils/createReducer.js";
import actions from "./types.js";

import { combineReducers } from "redux";

export const initialIsPloidyNormalized = false;
export const isPloidyNormalized = createReducer(initialIsPloidyNormalized)({
  [actions.switchNormalizePloidy]: (state, action) => !state
});

export const initialIsDiffsModeOn = false;
export const isDiffsModeOn = createReducer(initialIsDiffsModeOn)({
  [actions.switchDiffsByMode]: (state, action) => !state
});

/**
 * Main Reducer
 */
export const reducer = combineReducers({
  isPloidyNormalized,
  isDiffsModeOn
});

/**
 * State Selectors
 */

const getIsPloidyNormalized = state => state.isPloidyNormalized;
const getIsDiffsModeOn = state => state.isDiffsModeOn;

export const stateSelectors = {
  getIsPloidyNormalized,
  getIsDiffsModeOn
};

export default reducer;
