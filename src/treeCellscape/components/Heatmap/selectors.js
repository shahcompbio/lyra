export {
  getOrderedChromosomeData,
  getSegsByID,
  getMissingSegIndices
} from "../selectors.js";

import {
  getIndicesPerPixel,
  getTotalIndexNum,
  getTreeRootRecord
} from "../selectors.js";

import config from "./config.js";

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
const getHeatmapIDs = createSelector(
  [getIndicesPerRow, getTotalIndexNum, getTreeRootRecord],
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
