import { scaleOrdinal } from "d3";

/**
 * Configuration defaults for views
 */

/**
 * Overall config
 */

const CONSTANTS = {
  width: 1500,
  height: 1000,
  stateScale: [0, 1, 2, 3, 4, 5, 6],
  stateColors: [
    "#2e7aab",
    "#73a9d4",
    "#D6D5D5",
    "#fec28b",
    "#fd8b3a",
    "#ca632c",
    "#954c25"
  ]
};

export const config = {
  ...CONSTANTS
};

/**
 * Legend
 */

const LEGEND_CONSTANTS = {
  width: 100,
  x: 0
};

export const legendConfig = {
  ...LEGEND_CONSTANTS,
  height: config.height,
  stateScale: CONSTANTS.stateScale,
  stateColors: CONSTANTS.stateColors
};

/**
 * Tree-related config
 */

const TREE_CONSTANTS = {
  width: 700,
  height: 1000 - 20,

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
  clusterWidth: TREE_CONSTANTS.depthSpacing - TREE_CONSTANTS.nodeRadius,
  x: config.width - TREE_CONSTANTS.width
};

/**
 * Heatmap-related config
 */

const HEATMAP_CONSTANTS = {
  rowHeight: 5,
  indicatorWidth: 10,

  chromosome: {
    height: 12,
    color: ["#FFFFFF", "#dbdbdb"]
  }
};

const heatmapWidth = config.width - treeConfig.width - LEGEND_CONSTANTS.width;

export const heatmapConfig = {
  ...HEATMAP_CONSTANTS,
  width: heatmapWidth,
  contentWidth: heatmapWidth - HEATMAP_CONSTANTS.indicatorWidth,
  height: config.height,
  contentHeight: config.height - HEATMAP_CONSTANTS.chromosome.height,
  x: LEGEND_CONSTANTS.x + LEGEND_CONSTANTS.width,
  colorScale: scaleOrdinal()
    .domain(CONSTANTS.stateScale) // state
    .range(CONSTANTS.stateColors)
};
