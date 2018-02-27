import shiftSelectors from "utils/shiftSelectors.js";
import { createSelector } from "reselect";
import { getTreeData, getTreeRootID } from "data/selectors.js";
import { stateSelectors as highlightedStateSelectors } from "./highlighted/selectors.js";

const getTreePath = state => state.treePath;
const getHighlighted = state => state.highlighted;

export const stateSelectors = {
  getTreePath,
  getHighlighted,
  ...shiftSelectors(getHighlighted, highlightedStateSelectors)
};

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
