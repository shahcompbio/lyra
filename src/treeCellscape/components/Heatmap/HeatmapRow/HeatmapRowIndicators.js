/**
 * Indicator cell - Presentational Component
 */

import React from "react";
import PropTypes from "prop-types";
import config from "./config.js";

const HeatmapRowIndicators = ({ cellID, x, y, isHighlighted }) => (
  <rect
    key={cellID + "-indicator"}
    width={config["indicatorWidth"]}
    height={config["rowHeight"]}
    x={x}
    y={y}
    fill={isHighlighted ? "#000000" : "#FFFFFF"}
  />
);

/**
 * PropTypes
 */
HeatmapRowIndicators.propTypes = {
  /** cellID */
  cellID: PropTypes.string.isRequired,

  /** y - y-coordinate for row */
  y: PropTypes.number.isRequired,

  /** isHighlighted - whether current row is highlighted */
  isHighlighted: PropTypes.bool.isRequired
};

export default HeatmapRowIndicators;
