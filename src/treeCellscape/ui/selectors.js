import { createSelector } from "reselect";

export * from "./highlighted/selectors.js";

/**
 * Gets ID of current tree root
 */
export const getCurrTreeRootID = getTreePath =>
  createSelector(
    [getTreePath],
    // (array) => string
    path => (path.length === 0 ? "" : path[0])
  );

/**
 * Gets tree root record
 */
export const getCurrTreeRootRecord = getCurrTreeRootID => getTreeData =>
  createSelector(
    [getTreeData, getCurrTreeRootID],
    // (object, string) => object
    (nodes, rootID) => nodes[rootID]
  );

export const isCurrRootAtRoot = getCurrTreeRootID => getTreeRootID =>
  createSelector(
    [getCurrTreeRootID, getTreeRootID],
    (currRootID, trueRootID) => currRootID === trueRootID
  );
