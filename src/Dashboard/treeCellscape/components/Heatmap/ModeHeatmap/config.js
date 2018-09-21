import prevConfig from "../config.js";
import { modeHeatmapConfig } from "../../../config.js";

const config = {
  colorScale: prevConfig["copyNumberColorScale"],
  ...modeHeatmapConfig
};

export default config;
