import { createSelector } from "reselect";
import { getCellsIndexToID } from "./stateSelectors.js";

/**
 * Reselectors
 */
export * from "./tree/selectors.js";
export * from "./segs/selectors.js";

/**
 * Returns list of cellIDs given list of heatmap indices
 */
export const makeGetIDsByIndices = () =>
  createSelector(
    [getCellsIndexToID, (state, indices) => indices],
    // (array, array) => array
    (indexToIDs, indices) => indices.map(index => indexToIDs[index])
  );

/**
 * Filters for indices that do not have a cellID mapping yet
 */
export const makeGetMissingIDMappings = () =>
  createSelector(
    [getCellsIndexToID, (state, indices) => indices],
    // (array, array) => array
    (indexToIDs, indices) =>
      indices.filter(index => !indexToIDs.hasOwnProperty(index))
  );
