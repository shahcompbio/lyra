import { createSelector } from "reselect";
import shiftSelectors from "utils/shiftSelectors.js";

import { stateSelectors as treeStateSelectors } from "./tree/selectors.js";
import { stateSelectors as segsStateSelectors } from "./segs/selectors.js";

/**
 * State Selectors
 */

const getCellsTree = state => state.tree;
const getCellsSegs = state => state.segs;
const getCellsIndexToID = state => state.indexToID;

const indexToIDStateSelectors = {};

export const stateSelectors = {
  getCellsTree,
  getCellsSegs,
  getCellsIndexToID,
  ...shiftSelectors(getCellsTree, treeStateSelectors),
  ...shiftSelectors(getCellsSegs, segsStateSelectors),
  ...shiftSelectors(getCellsIndexToID, indexToIDStateSelectors)
};

/**
 * Reselectors
 */
export * from "./tree/selectors.js";
export * from "./segs/selectors.js";

/**
 * Returns list of cellIDs given list of heatmap indices
 */
export const getIDsByIndex = createSelector(
  [getCellsIndexToID, (state, indices) => indices],
  // (array, array) => array
  (indexToIDs, indices) => indices.map(index => indexToIDs[index])
);

/**
 * Filters for indices that do not have a cellID mapping yet
 */
export const getMissingIDMappings = createSelector(
  [getCellsIndexToID, (state, indices) => indices],
  // (array, array) => array
  (indexToIDs, indices) =>
    indices.filter(index => !indexToIDs.hasOwnProperty(index))
);
