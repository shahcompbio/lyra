import { createSelector } from "reselect";

import { getTreeData, getTreeRootID } from "data/selectors.js";
import { getTreePath } from "../selectors.js";

export {
  getHighlightedIndex,
  getHighlightedRange,
  getTreePath,
  getHighlighted
} from "../selectors.js";

export * from "./highlighted/selectors.js";

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
