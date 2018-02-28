/**
 * TreeNodeCircle presentational component
 */

import React from "react";
import PropTypes from "prop-types";

import { getXPosition } from "./selectors.js";
import config from "./config.js";

const TreeNodeCircle = ({
  heatmapIndex,
  depth,
  yScale,
  onMouseEnter,
  onMouseLeave,
  onMouseClick,
  isHighlighted
}) => (
  <circle
    cx={getXPosition(depth)}
    cy={yScale(heatmapIndex)}
    r={isHighlighted ? config["nodeRadius"] + 1 : config["nodeRadius"]}
    fill={isHighlighted ? config["highlightColor"] : config["nodeColor"]}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onMouseClick}
    data-tip
  />
);

/**
 * PropTypes
 */
TreeNodeCircle.propTypes = {
  /** heatmapIndex */
  heatmapIndex: PropTypes.number.isRequired,

  /** depth */
  depth: PropTypes.number.isRequired,

  /** yScale */
  yScale: PropTypes.func.isRequired,

  /** isHighlighted - whether current node is highlighted */
  isHighlighted: PropTypes.bool.isRequired,

  /** onMouseEnter, onMouseLeave, onMouseClick - event handlers */
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onMouseClick: PropTypes.func.isRequired
};

export default TreeNodeCircle;
