import { scaleLinear } from "d3";
import { getCurrRootRange, getIndicesPerPixel } from "../selectors.js";
import { createSelector } from "reselect";
import config from "./config.js";

// TreeCluster
export { makeIsIndexRangeHighlighted } from "../selectors.js";

// TreeNode
export { makeIsIndexHighlighted } from "../selectors.js";

// Tree
export { getCurrRootID } from "../selectors.js";

// TreeChildren
export { makeGetTreeElementsByChildren } from "./elementsSelector.js";

/**
 * Gets offset index distance - the number of indices to remove at the end for branch/cluster spacing
 */
export const getOffsetIndex = createSelector(
  [getIndicesPerPixel],
  // int => int
  indPerPx => indPerPx * config["clusterVerticalOffset"]
);

/**
 * Gets heatmap index to y-coordinate scale
 */
export const getYScale = createSelector(
  [getCurrRootRange],
  // int => func
  range => {
    return scaleLinear()
      .domain(range)
      .range([config["nodeRadius"], config["height"]]);
  }
);

/**
 * Gets x position for tree component given some depth
 * @param {int} depth
 * @return {int}
 */
export const getXPosition = depth =>
  depth * config["depthSpacing"] + config["nodeRadius"];
