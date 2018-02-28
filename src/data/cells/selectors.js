import { createSelector } from "reselect";
import { getCellsIndexToID } from "../selectors.js";

export {
  getTreeRootID,
  getTreeData,
  getTreePending,
  getSegsData,
  getSegsPending,
  getCellsSegs,
  getCellsTree,
  getCellsIndexToID
} from "../selectors.js";

/**
 * Reselectors
 */
export * from "./tree/selectors.js";
export * from "./segs/selectors.js";

/**
 * Returns list of cellIDs given list of heatmap indices
 */
export const getIDsByIndices = createSelector(
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
