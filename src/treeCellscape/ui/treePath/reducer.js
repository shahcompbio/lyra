import createReducer from "utils/createReducer.js";
import actions from "./types.js";

import treeDataActions from "data/types.js";

/**
 * treeRootPath { array }
 * 	list of tree roots we've zoomed into so far to get to current tree root
 */
const initialTreeRootPath = [];
const reducer = createReducer(initialTreeRootPath)({
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

export default reducer;
