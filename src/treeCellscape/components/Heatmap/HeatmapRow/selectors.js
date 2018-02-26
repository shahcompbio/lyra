export { makeIsIndexHighlighted } from "../selectors.js";

import {
  getHeatmapIDs,
  getOrderedChromosomeData,
  getTotalBP
} from "../selectors.js";

import config from "./config.js";

/**
 * Gets the heatmap (index) to pixel y scale
 */
export const getYScale = createSelector(
  [getHeatmapIDs],
  // array => func
  ids =>
    scalePoint()
      .domain(ids)
      .range([0, ids.length * config["rowHeight"]])
);

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
