import { scaleOrdinal, scaleLinear } from "d3";

/**
 * Configuration defaults for views
 */

/**
 * Overall config
 */

/*const COLORS = [
  "#2e7aab",
  "#73a9d4",
  "#D6D5D5",
  "#fec28b",
  "#fd8b3a",
  "#ca632c",
  "#954c25"
];*/

const COLORS = [
  "#2e7aab",
  "#9ECAE1",
  "#CCCCCC",
  "#FDCC8A",
  "#FC8D59",
  "#E34A33",
  "#B30000",
  "#980043",
  "#DD1C77",
  "#DF65B0",
  "#C994C7",
  "#D4B9DA"
];

const CONSTANTS = {
  width: 1500,
  height: 1000,
  stateScale: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  stateColors: COLORS,
  ploidyColors: ["#073757", ...COLORS, "#fae2ff"],
  ploidyScale: [-12, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12]
};

export const config = {
  ...CONSTANTS
};

/**
 * Component dimensions
 */

const COMPONENTS = {
  width: 1500,
  height: 1200,

  legendWidth: 100,
  legendX: 0,

  treeWidth: 680,

  heatmapChromHeight: 12,

  modeHeatmapHeight: 200
};

export const componentConfig = {
  ...COMPONENTS,
  legendHeight: COMPONENTS.height,

  treeHeight:
    COMPONENTS.height -
    COMPONENTS.modeHeatmapHeight -
    COMPONENTS.heatmapChromHeight,
  treeX: COMPONENTS.width - COMPONENTS.treeWidth,

  heatmapWidth:
    COMPONENTS.width - COMPONENTS.treeWidth - COMPONENTS.legendWidth,
  heatmapHeight: COMPONENTS.height - COMPONENTS.modeHeatmapHeight,
  heatmapX: COMPONENTS.legendX + COMPONENTS.legendWidth,

  modeHeatmapY: COMPONENTS.height - COMPONENTS.modeHeatmapHeight
};

/**
 * Colors
 */

/**
 * Legend
 */

const LEGEND_CONSTANTS = {
  width: componentConfig.legendWidth,
  x: componentConfig.legendX,
  height: componentConfig.legendHeight
};

export const legendConfig = {
  ...LEGEND_CONSTANTS,
  stateScale: CONSTANTS.stateScale,
  stateColors: CONSTANTS.stateColors,
  ploidyScale: CONSTANTS.ploidyScale,
  ploidyColors: CONSTANTS.ploidyColors
};

/**
 * Tree-related config
 */

const TREE_CONSTANTS = {
  width: componentConfig.treeWidth,
  height: componentConfig.treeHeight,
  x: componentConfig.treeX,

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
  width: componentConfig.heatmapWidth,
  height: componentConfig.heatmapHeight,
  x: componentConfig.heatmapX,
  rowHeight: 5,
  indicatorWidth: 10,

  annotationSpacing: 2,
  chromosome: {
    height: componentConfig.heatmapChromHeight,
    color: ["#faf9f9", "#e6e6e6"]
  }
};

export const heatmapConfig = {
  ...HEATMAP_CONSTANTS,
  contentWidth: HEATMAP_CONSTANTS.width - HEATMAP_CONSTANTS.indicatorWidth,
  contentHeight: HEATMAP_CONSTANTS.height - HEATMAP_CONSTANTS.chromosome.height,
  colorScale: scaleOrdinal()
    .domain(CONSTANTS.stateScale) // state
    .range(CONSTANTS.stateColors),
  ploidyColorScale: scaleLinear()
    .domain(CONSTANTS.ploidyScale) // state
    .range(CONSTANTS.ploidyColors),
  annotationRadius: HEATMAP_CONSTANTS.rowHeight / 2
};

/**
 * Mode Heatmap
 */

const MODE_HM_CONSTANTS = {
  width: componentConfig.heatmapWidth,
  height: componentConfig.modeHeatmapHeight,
  x: componentConfig.heatmapX,
  y: componentConfig.modeHeatmapY + 10
};

export const modeHeatmapConfig = {
  ...MODE_HM_CONSTANTS,
  rowHeight: HEATMAP_CONSTANTS["rowHeight"] * 2
};
