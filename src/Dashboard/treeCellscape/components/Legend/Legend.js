import React from "react";
import { connect } from "react-redux";
import { getIsPloidyNormalized, getIsDiffsModeOn } from "./selectors.js";

import LegendItem from "./LegendItem.js";

import config from "./config.js";

const Legend = ({ analysis }) => (
  <svg width={config["width"]} height={config["height"]}>
    <State />
  </svg>
);

const { stateScale, stateColors, ploidyScale, ploidyColors } = config;

const State = connect(state => ({
  isPloidyNormalized: getIsPloidyNormalized(state),
  isDiffOn: getIsDiffsModeOn(state)
}))(({ isPloidyNormalized, isDiffOn }) => {
  const title = isDiffOn || isPloidyNormalized ? "Relative CN" : "Copy Number";
  const labels = isDiffOn ? ploidyScale : stateScale;
  const colors = isDiffOn ? ploidyColors : stateColors;

  return <LegendItem title={title} labels={labels} colors={colors} y={8} />;
});

export default Legend;
