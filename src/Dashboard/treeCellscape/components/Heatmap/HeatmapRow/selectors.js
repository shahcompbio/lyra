import { getHeatmapIndices, getChromPixelMapping } from "../selectors.js";

import config from "./config.js";
import { createSelector } from "reselect";
import { scalePoint } from "d3";

export {
  makeIsIndexHighlighted,
  getChromPixelMapping,
  getBPRatio
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

export const getIndicatorXPosition = createSelector(
  [getChromPixelMapping],
  chromPixelMapping =>
    chromPixelMapping["Y"]["width"] + chromPixelMapping["Y"]["x"]
);
