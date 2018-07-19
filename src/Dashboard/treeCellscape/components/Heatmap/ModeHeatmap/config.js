import prevConfig from "../config.js";
import { modeHeatmapConfig } from "../../../config.js";

const config = {
  colorScale: prevConfig["colorScale"],
  ...modeHeatmapConfig
};

export default config;
