import {
  getHeatmapIndices,
  getChromPixelMapping,
  getIsPloidyNormalized
} from "../selectors.js";

import config from "./config.js";
import { createSelector } from "reselect";
import { scalePoint } from "d3";

export {
  makeIsIndexHighlighted,
  getChromPixelMapping,
  getBPRatio,
  getIsPloidyNormalized
} from "../selectors.js";

/**
 * Gets the heatmap (index) to pixel y scale
 */
export const getYScale = createSelector(
  [getHeatmapIndices],
  // array => func
  indices =>
    scalePoint()
      .domain(indices)
      .range([0, indices.length * config["rowHeight"]])
);

export const getHeatmapX = state => 0;

export const getChromosomeEndX = createSelector(
  [getChromPixelMapping],
  chromPixelMapping =>
    chromPixelMapping["Y"]["width"] + chromPixelMapping["Y"]["x"]
);

export const getAnnotationsX = createSelector(
  [getChromosomeEndX, getHeatmapX],
  (chromosomeX, heatmapX) => chromosomeX + heatmapX + config["spacing"]
);

export const getIndicatorXPosition = createSelector(
  [getAnnotationsX, getIsPloidyNormalized],
  (annotationX, isPloidyNormalized) =>
    isPloidyNormalized
      ? annotationX + config["rowHeight"] + config["spacing"]
      : annotationX
);
