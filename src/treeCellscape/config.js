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

  nodeRadius: 3,
  nodeColor: "#b3b3b3",
  verticalBranchColor: "#000000",
  horizontalBranchColor: "#626262",
  highlightColor: "#2e7aab",

  clusterColorGradient: ["#CECECE", "#CECECE"],

  horizontalBranchWidth: 1,
  verticalBranchWidth: 4,

  depthSpacing: 20,

  clusterVerticalOffset: 5,

  clusterMinHeight: 3
};

export const treeConfig = {
  ...TREE_CONSTANTS,
  clusterWidth: TREE_CONSTANTS.treeDepthSpacing - TREE_CONSTANTS.treeNodeRadius
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
  x: treeConfig.width,
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
