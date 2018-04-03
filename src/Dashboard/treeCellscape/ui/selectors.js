import { createSelector } from "reselect";
import { getTreePath } from "./localSelectors.js";

export * from "./highlighted/selectors.js";

/**
 * Gets ID of current tree root
 */
export const getCurrTreeRootID = createSelector(
  [getTreePath],
  // (array) => string
  path => (path.length === 0 ? "" : path[0])
);
