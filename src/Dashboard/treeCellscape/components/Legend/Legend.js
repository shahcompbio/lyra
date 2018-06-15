import React from "react";
import LegendItem from "./LegendItem.js";

import config from "./config.js";

const Legend = ({ analysis }) => (
  <svg width={config["width"]} height={config["height"]}>
    <State />
  </svg>
);

const { stateScale, stateColors } = config;

const State = () => (
  <LegendItem title={"State"} labels={stateScale} colors={stateColors} y={8} />
);

export default Legend;
