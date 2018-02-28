import { createSelector } from "reselect";

import {
  getIndicesPerPixel,
  getTotalIndexNum,
  getCurrTreeRootRecord,
  getSegsData,
  getCellsIndexToID
} from "../selectors.js";

import config from "./config.js";
export {
  getOrderedChromosomeData,
  getMissingSegIDs,
  makeIsIndexHighlighted,
  getMissingIDMappings
} from "../selectors.js";

/**
 * Gets number of indices that can fit per heatmap row
 */
export const getIndicesPerRow = createSelector(
  [getIndicesPerPixel],
  // int => int
  indPerPx => Math.ceil(indPerPx * config["rowHeight"])
);

/**
 * Gets list of indices to display on heatmap
 */
export const getHeatmapIndices = createSelector(
  [getIndicesPerRow, getTotalIndexNum, getCurrTreeRootRecord],
  // (int, int) => array
  (indPerRow, totalIndices, treeRoot) => {
    const numRows = Math.floor(totalIndices / indPerRow);

    const ids = Array.from(
      Array(numRows),
      (_, x) => x * indPerRow + treeRoot["heatmapIndex"]
    );

    return ids;
  }
);

export const getHeatmapIDs = createSelector(
  [getHeatmapIndices, getCellsIndexToID],
  (indices, indexToID) => indices.map(index => indexToID[index])
);

/**
 *
 */
export const getHeatmapSegData = createSelector(
  [getSegsData, getHeatmapIDs, getHeatmapIndices],
  (segs, ids, indices) =>
    ids
      .filter(id => segs.hasOwnProperty(id))
      .map((id, index) => createSegment(segs[id], id, indices[index]))
);

/**
 * Creates record given segment data and heatmap index
 * @param {array} seg
 * @param {string} id
 * @return {object}
 */
const createSegment = (segs, cellID, heatmapIndex) => ({
  cellID,
  segs,
  heatmapIndex
});
