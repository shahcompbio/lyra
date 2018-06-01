import { createSelector } from "reselect";
import { getRootPath, getRootRanges } from "./localSelectors.js";

/**
 * Gets ID of current tree root
 */
export const getCurrRootID = createSelector(
  [getRootPath],
  // (array) => string
  path => (path.length === 0 ? "" : path[0])
);

/**
 * Gets index range at current tree root
 */
export const getCurrRootRange = createSelector(
  [getRootRanges],
  // (array) => int
  ranges => (ranges.length === 0 ? [] : ranges[0])
);

/**
 * Gets the total number of nodes from current root
 */
export const getCurrRootTotalNodes = createSelector(
  [getCurrRootRange],
  range => (range.length === 0 ? 0 : range[1] - range[0] + 1)
);

/**
 * Gets index of current tree root
 */
export const getCurrRootIndex = createSelector(
  [getCurrRootRange],
  // (array) => int
  range => (range.length === 0 ? -1 : range[0])
);

/**
 *
 */
export const isCurrRootAtRoot = createSelector(
  [getRootPath],
  path => path.length === 1
);
