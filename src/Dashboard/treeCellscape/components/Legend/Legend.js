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

const {
  copyNumberLabels,
  copyNumberColors,
  diffFromLabels,
  diffFromColors
} = config;

const State = connect(state => ({
  isPloidyNormalized: getIsPloidyNormalized(state),
  isDiffOn: getIsDiffsModeOn(state)
}))(({ isPloidyNormalized, isDiffOn }) => {
  const title = isDiffOn || isPloidyNormalized ? "Relative CN" : "Copy Number";
  const labels = isDiffOn ? diffFromLabels : copyNumberLabels;
  const scale = isPloidyNormalized
    ? labels.map(label => 100 * label / 2 + "%")
    : labels;
  const colors = isDiffOn ? diffFromColors : copyNumberColors;

  return <LegendItem title={title} labels={scale} colors={colors} y={8} />;
});

export default Legend;
