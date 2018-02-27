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
  getMissingSegIndices,
  makeIsIndexHighlighted
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
const getHeatmapIndices = createSelector(
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
  (indices, indexToID) =>
    indices
      .filter(index => indexToID.hasOwnProperty(index))
      .map(index => indexToID[index])
);

/**
 *
 */
export const getHeatmapSegData = createSelector(
  [getSegsData, getHeatmapIDs],
  (segs, ids) =>
    ids
      .filter(id => segs.hasOwnProperty(id))
      .map(id => createSegment(segs[id], id))
);

/**
 * Creates record given segment data and heatmap index
 * @param {array} seg
 * @param {string} id
 * @return {object}
 */
const createSegment = (segs, cellID) => ({
  cellID,
  segs
});
