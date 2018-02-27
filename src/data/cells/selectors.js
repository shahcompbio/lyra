import { createSelector } from "reselect";

/**
 * Reselectors
 */
export * from "./tree/selectors.js";
export * from "./segs/selectors.js";

/**
 * Returns list of cellIDs given list of heatmap indices
 */
export const getIDsByIndices = getCellsIndexToID =>
  createSelector(
    [getCellsIndexToID, (state, indices) => indices],
    // (array, array) => array
    (indexToIDs, indices) => indices.map(index => indexToIDs[index])
  );

/**
 * Filters for indices that do not have a cellID mapping yet
 */
export const getMissingIDMappings = getCellsIndexToID =>
  createSelector(
    [getCellsIndexToID, (state, indices) => indices],
    // (array, array) => array
    (indexToIDs, indices) =>
      indices.filter(index => !indexToIDs.hasOwnProperty(index))
  );
