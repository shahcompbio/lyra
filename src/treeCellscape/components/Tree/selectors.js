import { scaleLinear } from "d3";
import { getCurrTreeRootRecord, getIndicesPerPixel } from "../selectors.js";
import { createSelector } from "reselect";
import config from "./config.js";

// TreeCluster
export { makeIsIndexRangeHighlighted } from "../selectors.js";

// TreeNode
export { makeIsIndexHighlighted } from "../selectors.js";

// Tree
export { getCurrTreeRootID } from "../selectors.js";

// TreeNode
export { makeGetTreeNodeRecordByID } from "../selectors.js";

// TreeChildren
export { makeGetTreeElementsByChildren } from "./elementsSelector.js";

/**
 * Get max height of tree
 */
export const getMaxHeight = createSelector(
  [getCurrTreeRootRecord],
  // object => int
  treeRoot => treeRoot["maxHeight"]
);

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
  [getCurrTreeRootRecord],
  // int => func
  treeRoot => {
    return scaleLinear()
      .domain([treeRoot["heatmapIndex"], treeRoot["maxDescendantIndex"]])
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
