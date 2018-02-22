import shiftSelectors from "utils/shiftSelectors.js";

import { getTreeData, getTreeRootID } from "data/selectors.js";

const getTreePath = state => state;

export const stateSelectors = {
  getTreePath
};

/**
 * Gets ID of current tree root
 */
export const getCurrTreeRoot = createSelector(
  [getTreePath],
  // (array) => string
  path => (path.length === 0 ? "" : path[0])
);

/**
 * Gets tree root record
 */
export const getCurrTreeRootRecord = createSelector(
  [getTreeData, getCurrTreeRoot],
  // (object, string) => object
  (nodes, rootID) => nodes[rootID]
);

export const isCurrRootAtRoot = createSelector(
  [getCurrTreeRoot, getTreeRootID],
  (currRootID, trueRootID) => currRootID === trueRootID
);
