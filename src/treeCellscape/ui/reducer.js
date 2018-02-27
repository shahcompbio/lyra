import { combineReducers } from "redux";
import highlighted from "./highlighted/reducer.js";
import createReducer from "utils/createReducer.js";
import actions from "./types.js";
import treeDataActions from "data/types.js";

import shiftSelectors from "utils/shiftSelectors.js";
import { stateSelectors as highlightedStateSelectors } from "./highlighted/selectors.js";

/**
 * treeRootPath { array }
 * 	list of tree roots we've zoomed into so far to get to current tree root
 */
const initialTreeRootPath = [];
const treePath = createReducer(initialTreeRootPath)({
  [treeDataActions.fetchTreeRootSuccess]: (state, action) => [
    action.root["cellID"],
    ...state
  ],
  [actions.setTreeRoot]: (state, action) => [action.nodeID, ...state],
  [actions.unsetTreeRoot]: (state, action) => {
    // eslint-disable-next-line
    const [firstRoot, ...restRoot] = state;
    return restRoot;
  }
});

const reducer = combineReducers({
  treePath,
  highlighted
});

/**
 * State Selectors
 */

const getTreePath = state => state.treePath;
const getHighlighted = state => state.highlighted;

export const stateSelectors = {
  getTreePath,
  getHighlighted,
  ...shiftSelectors(getHighlighted, highlightedStateSelectors)
};

export default reducer;
