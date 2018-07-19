import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ModeRow from "./ModeRow.js";
import CellRow from "./CellRow.js";

import { getChromPixelMapping, getBPRatio } from "./selectors.js";

import config from "./config.js";

const ModeHeatmap = ({ analysis, chromMap, bpRatio }) => (
  <svg width={config["width"]} height={config["height"]} y={config["y"]}>
    <ModeRow analysis={analysis} chromMap={chromMap} bpRatio={bpRatio} />
    <CellRow analysis={analysis} chromMap={chromMap} bpRatio={bpRatio} />
  </svg>
);

ModeHeatmap.propTypes = {
  analysis: PropTypes.string.isRequired,
  chromMap: PropTypes.object.isRequired,
  bpRatio: PropTypes.number.isRequired
};

const mapState = (state, ownProps) => ({
  chromMap: getChromPixelMapping(state, ownProps.chromosomes),
  bpRatio: getBPRatio(state, ownProps.chromosomes)
});

export default connect(mapState)(ModeHeatmap);
