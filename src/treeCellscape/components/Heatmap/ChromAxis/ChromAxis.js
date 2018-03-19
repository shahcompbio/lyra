import React from "react";
import { connect } from "react-redux";

import { getChromPixelMapping, getChromosomeOrder } from "./selectors.js";

import ChromAxisItem from "./ChromAxisItem.js";

const ChromAxis = ({ chromosomeMap, chromosomeOrder, y }) => {
  const axisText = chromosomeOrder.map(chromosome => (
    <ChromAxisItem
      key={chromosome}
      chromosome={chromosome}
      data={chromosomeMap[chromosome]}
      y={y}
    />
  ));
  return <g className="chromAxis">{axisText}</g>;
};

const mapState = state => ({
  chromosomeMap: getChromPixelMapping(state),
  chromosomeOrder: getChromosomeOrder(state)
});

export default connect(mapState)(ChromAxis);
