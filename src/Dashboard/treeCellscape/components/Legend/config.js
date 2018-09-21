import { legendConfig } from "../../config.js";

const config = {
  width: legendConfig["width"],
  x: legendConfig["x"],
  height: legendConfig["height"],

  copyNumberLabels: legendConfig["copyNumberLabels"],
  copyNumberColors: legendConfig["copyNumberColors"],
  diffFromLabels: legendConfig["diffFromLabels"],
  ploidyPercentLabels: legendConfig["ploidyPercentLabels"],
  diffFromColors: legendConfig["diffFromColors"]
};

export default config;
