import React, { Component } from "react";
import PropTypes from "prop-types";

import config from "./config.js";
const HeatmapRowAnnotations = ({ cellID, ploidy, isPloidyNormalized, y, x }) =>
  isPloidyNormalized && isDiffPloidy(ploidy) ? (
    <Annotation x={x} y={y} fill={"#000000"} />
  ) : null;

const isDiffPloidy = ploidy => ploidy !== 2;

const Annotation = ({ x, y, color }) => (
  <circle
    cx={x + config["annotationRadius"]}
    cy={y + config["annotationRadius"]}
    r={config["annotationRadius"]}
    fill={color}
  />
);

export default HeatmapRowAnnotations;
