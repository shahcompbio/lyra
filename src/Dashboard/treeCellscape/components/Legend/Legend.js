import React from "react";
import { connect } from "react-redux";
import { getIsPloidyNormalized } from "./selectors.js";

import LegendItem from "./LegendItem.js";

import config from "./config.js";

const Legend = ({ analysis }) => (
  <svg width={config["width"]} height={config["height"]}>
    <State />
  </svg>
);

const { stateScale, stateColors, ploidyScale, ploidyColors } = config;

const State = connect(state => ({
  isPloidyNormalized: getIsPloidyNormalized(state)
}))(
  ({ isPloidyNormalized }) =>
    isPloidyNormalized ? (
      <LegendItem
        title={"State - Ploidy"}
        labels={ploidyScale}
        colors={ploidyColors}
        y={8}
      />
    ) : (
      <LegendItem
        title={"State"}
        labels={stateScale}
        colors={stateColors}
        y={8}
      />
    )
);

export default Legend;
