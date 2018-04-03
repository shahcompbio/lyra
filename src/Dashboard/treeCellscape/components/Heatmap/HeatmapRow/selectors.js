import { getHeatmapIDs, getChromPixelMapping } from "../selectors.js";

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
  [getHeatmapIDs],
  // array => func
  ids =>
    scalePoint()
      .domain(ids)
      .range([0, ids.length * config["rowHeight"]])
);

export const getIndicatorXPosition = createSelector(
  [getChromPixelMapping],
  chromPixelMapping =>
    chromPixelMapping["Y"]["width"] + chromPixelMapping["Y"]["x"]
);
