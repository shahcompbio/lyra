import { legendConfig } from "../../config.js";

const config = {
  width: legendConfig["width"],
  x: legendConfig["x"],
  height: legendConfig["height"],

  stateScale: legendConfig["stateScale"],
  stateColors: legendConfig["stateColors"],
  ploidyScale: legendConfig["ploidyScale"],
  ploidyColors: legendConfig["ploidyColors"]
};

export default config;
