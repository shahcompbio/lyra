import { scaleOrdinal } from "d3";

/**
 * Configuration defaults for views
 */

/**
 * Overall config
 */

const CONSTANTS = {
  width: 1500,
  height: 1000
};

export const config = {
  ...CONSTANTS
};

/**
 * Tree-related config
 */

const TREE_CONSTANTS = {
  width: 800,
  height: 1000,
  x: 750,

  nodeRadius: 3,
  nodeColor: "#b3b3b3",
  horizontalBranchColor: "#333333",
  verticalBranchColor: "#bfbfbf",
  highlightColor: "#2e7aab",

  clusterColorGradient: ["#CECECE", "#CECECE"],

  horizontalBranchWidth: 1,
  verticalBranchWidth: 2,

  depthSpacing: 20,

  clusterVerticalOffset: 5,

  thresholdMin: 20,
  clusterMinHeight: 3
};

export const treeConfig = {
  ...TREE_CONSTANTS,
  clusterWidth: TREE_CONSTANTS.depthSpacing - TREE_CONSTANTS.nodeRadius
};

/**
 * Heatmap-related config
 */

const HEATMAP_CONSTANTS = {
  rowHeight: 5,
  indicatorWidth: 10
};

export const heatmapConfig = {
  ...HEATMAP_CONSTANTS,

  width: config.width - treeConfig.width,
  contentWidth:
    config.width - treeConfig.width - HEATMAP_CONSTANTS.indicatorWidth,
  height: config.height,
  x: 0,
  colorScale: scaleOrdinal()
    .domain([1, 2, 3, 4, 5, 6, 7]) // state
    .range([
      "#2e7aab",
      "#73a9d4",
      "#D6D5D5",
      "#fec28b",
      "#fd8b3a",
      "#ca632c",
      "#954c25"
    ])
};
