import { getMaxHeight } from "../selectors.js";
import { scaleLinear } from "d3";
import { createSelector } from "reselect";
import config from "./config.js";

export { makeIsIndexRangeHighlighted, getXPosition } from "../selectors.js";

/**
 * Get color scale for cluster height
 */

export const getClusterColorScale = createSelector(
  [getMaxHeight],
  // int => func
  maxHeight =>
    scaleLinear()
      .domain([0, maxHeight])
      .range(config["clusterColorGradient"])
);
