import createReducer from "utils/createReducer.js";
import { combineReducers } from "redux";
import actions from "./types.js";

/**
 * path {array}
 * list of tree roots zoomed in so far
 */
export const initialPath = [];
export const path = createReducer(initialPath)({
  [actions.setTreeRoot]: (state, action) => [action.nodeID, ...state],
  [actions.unsetTreeRoot]: (state, action) => {
    // eslint-disable-next-line
    const [firstRoot, ...restRoot] = state;
    return restRoot.length === 0 ? state : restRoot;
  }
});

/**
 * ranges { array }
 * list of [min, max] index pairs for root node in path
 */
export const initialRanges = [];
export const ranges = createReducer(initialRanges)({
  [actions.setTreeRoot]: (state, action) => [
    [action.minIndex, action.maxIndex],
    ...state
  ],
  [actions.unsetTreeRoot]: (state, action) => {
    // eslint-disable-next-line
    const [firstRoot, ...restRoot] = state;
    return restRoot.length === 0 ? state : restRoot;
  }
});

const reducer = combineReducers({
  path,
  ranges
});

/**
 * State Selectors
 */

const getRootPath = state => state.path;
const getRootRanges = state => state.ranges;

export const stateSelectors = {
  getRootPath,
  getRootRanges
};

export default reducer;
