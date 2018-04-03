import { createSelector } from "reselect";

import {
  getIndicesPerPixel,
  getTotalIndexNum,
  getCurrTreeRootRecord,
  getSegsData,
  getOrderedChromosomeData,
  makeGetMissingIDMappings,
  makeGetIDsByIndices,
  getMissingSegIDs
} from "../selectors.js";

import config from "./config.js";

// Heatmap
export { getOrderedChromosomeData } from "../selectors.js";

// HeatmapRow
export { makeIsIndexHighlighted } from "../selectors.js";

// ChromAxis
export { getChromosomeOrder } from "../selectors.js";

/**
 * Gets number of indices that can fit per heatmap row
 */
export const getIndicesPerRow = createSelector(
  [getIndicesPerPixel],
  // int => int
  indPerPx => Math.ceil(indPerPx * config["rowHeight"])
);

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

const getMissingIDMappings = makeGetMissingIDMappings();

export const getMissingHeatmapIDs = state =>
  getMissingIDMappings(state, getHeatmapIndices(state));

const getIDsByIndices = makeGetIDsByIndices();
export const getHeatmapIDs = state =>
  getIDsByIndices(state, getHeatmapIndices(state));

export const getMissingHeatmapSegIDs = state =>
  getMissingSegIDs(state, getHeatmapIDs(state));

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

/**
 * Gets the total number of base pairs in chromosome ranges
 */
const getTotalBP = createSelector(
  [getOrderedChromosomeData],
  // array => int
  chromosomes =>
    chromosomes.reduce((sum, chrom) => sum + chrom.end - chrom.start + 1, 0)
);

/**
 * Gets base pair to pixel ratio
 */
export const getBPRatio = createSelector(
  [getTotalBP],
  // int => int
  totalBP => Math.ceil(totalBP / config["contentWidth"])
);

/**
 * Gets the chromosome to start pixel mapping
 */
export const getChromPixelMapping = createSelector(
  [getOrderedChromosomeData, getBPRatio],
  // (array, int) => object
  (chromosomes, bpRatio) => {
    let xShift = 0;
    return chromosomes.reduce((map, chrom) => {
      const chromWidth = getChromWidth(chrom, bpRatio);

      const mapEntry = {
        x: xShift,
        width: chromWidth
      };

      xShift += chromWidth;

      return {
        ...map,
        [chrom.chrom]: mapEntry
      };
    }, {});
  }
);

/**
 * Returns the width (in pixels) for chromosome
 * @param {object} chrom - data
 * @param {int} bpRatio
 * @return {int}
 */
const getChromWidth = (chrom, bpRatio) =>
  Math.floor((chrom.end - chrom.start + 1) / bpRatio);
