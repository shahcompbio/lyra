import { createSelector } from "reselect";

import { getTreeData, getTreeRootID } from "../selectors.js";
import { getTreePath } from "./stateSelectors.js";

/**
 * Gets ID of current tree root
 */
export const getCurrTreeRootID = createSelector(
  [getTreePath],
  // (array) => string
  path => (path.length === 0 ? "" : path[0])
);

/**
 * Gets tree root record
 */
export const getCurrTreeRootRecord = createSelector(
  [getTreeData, getCurrTreeRootID],
  // (object, string) => object
  (nodes, rootID) => nodes[rootID]
);

export const isCurrRootAtRoot = createSelector(
  [getCurrTreeRootID, getTreeRootID],
  (currRootID, trueRootID) => currRootID === trueRootID
);
