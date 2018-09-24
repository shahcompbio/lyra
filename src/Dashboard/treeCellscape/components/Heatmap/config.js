import { heatmapConfig } from "../../config.js";

export { modeHeatmapConfig } from "../../config.js";

const config = {
  width: heatmapConfig["width"],
  height: heatmapConfig["height"],
  x: heatmapConfig["x"],
  contentWidth: heatmapConfig["contentWidth"],
  contentHeight: heatmapConfig["contentHeight"],
  indicatorWidth: heatmapConfig["indicatorWidth"],
  rowHeight: heatmapConfig["rowHeight"],
  copyNumberLabels: heatmapConfig["copyNumberLabels"],
  copyNumberColors: heatmapConfig["copyNumberColors"],
  diffFromColors: heatmapConfig["diffFromColors"],
  diffFromLabels: heatmapConfig["diffFromLabels"],
  chromosome: heatmapConfig["chromosome"],
  spacing: heatmapConfig["annotationSpacing"],
  annotationRadius: heatmapConfig["annotationRadius"]
};

export default config;
