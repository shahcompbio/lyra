import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getChromPixelMapping } from "./selectors.js";

import ChromAxisItem from "./ChromAxisItem.js";

const ChromAxis = ({ chromosomeMap, chromosomes, y }) => {
  const axisText = chromosomes.map(chromosome => (
    <ChromAxisItem
      key={chromosome.id}
      chromosome={chromosome.id}
      data={chromosomeMap[chromosome.id]}
      y={y}
    />
  ));
  return <g className="chromAxis">{axisText}</g>;
};

ChromAxis.propTypes = {
  chromosomeMap: PropTypes.object.isRequired,

  chromosomes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,

  y: PropTypes.number.isRequired
};

const mapState = (state, ownProps) => ({
  chromosomeMap: getChromPixelMapping(state, ownProps.chromosomes)
});

export default connect(mapState)(ChromAxis);
