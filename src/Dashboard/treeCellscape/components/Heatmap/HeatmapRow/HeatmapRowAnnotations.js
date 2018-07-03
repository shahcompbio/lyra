import React from "react";
import PropTypes from "prop-types";

import config from "./config.js";
const HeatmapRowAnnotations = ({ ploidy, isPloidyNormalized, y, x }) =>
  isPloidyNormalized && isDiffPloidy(ploidy) ? (
    <Annotation x={x} y={y} fill={"#000000"} />
  ) : null;

HeatmapRowAnnotations.propTypes = {
  ploidy: PropTypes.number.isRequired,
  isPloidyNormalized: PropTypes.bool.isRequired,
  y: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired
};
const isDiffPloidy = ploidy => ploidy !== 2 && ploidy !== -1;

const Annotation = ({ x, y, color }) => (
  <circle
    cx={x + config["annotationRadius"]}
    cy={y + config["annotationRadius"]}
    r={config["annotationRadius"]}
    fill={color}
  />
);

export default HeatmapRowAnnotations;
