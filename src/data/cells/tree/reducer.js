/**
 * Reducer for trees
 */

import { combineReducers } from "redux";
import createReducer from "utils/createReducer.js";
import actions from "./types.js";

/**
 * rootID {string}
 * 	cell ID of the root node
 */

const initialTreeRootID = "";

const rootID = createReducer(initialTreeRootID)({
  [actions.fetchTreeRootSuccess]: (state, action) => action.root["cellID"]
});

/**
 * data {object}
 * 	data.key {string} - cell ID of node
 * 	data.value {object} - record of node
 */

const initialNodes = {};

const data = createReducer(initialNodes)({
  [actions.fetchTreeRootSuccess]: (state, action) => ({
    [action.root["cellID"]]: action.root,
    ...state
  }),
  [actions.fetchTreeNodesSuccess]: (state, action) => {
    const { treeNodes } = action;

    const treeNodeMap = processTreeNodes(treeNodes);

    return {
      ...state,
      ...treeNodeMap
    };
  },
  [actions.fetchAllTreeNodesSuccess]: (state, action) => ({
    ...state,
    ...processTreeNodes(action.treeNodes)
  })
});

const processTreeNodes = treeNodes =>
  treeNodes.reduce(
    (map, record) => ({
      ...map,
      [record["cellID"]]: record
    }),
    {}
  );

/**
 * Tree reducer
 * - treeRoot {string}
 * - nodes {object}
 */
const reducer = combineReducers({
  rootID,
  data
});

/**
 * State Selectors
 */

const getTreeRootID = state => state.rootID;
const getTreeData = state => state.data;

export const stateSelectors = {
  getTreeRootID,
  getTreeData
};

export default reducer;
