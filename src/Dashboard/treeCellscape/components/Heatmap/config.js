import { heatmapConfig } from "../../config.js";

const config = {
  width: heatmapConfig["width"],
  height: heatmapConfig["height"],
  x: heatmapConfig["x"],
  contentWidth: heatmapConfig["contentWidth"],
  contentHeight: heatmapConfig["contentHeight"],
  indicatorWidth: heatmapConfig["indicatorWidth"],
  rowHeight: heatmapConfig["rowHeight"],
  colorScale: heatmapConfig["colorScale"],
  ploidyColorScale: heatmapConfig["ploidyColorScale"],
  chromosome: heatmapConfig["chromosome"],
  spacing: heatmapConfig["annotationSpacing"],
  annotationRadius: heatmapConfig["annotationRadius"]
};

export default config;
