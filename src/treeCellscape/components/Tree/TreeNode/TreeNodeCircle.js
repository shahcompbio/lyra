/**
 * TreeNodeCircle presentational component
 */

import React from "react";
import PropTypes from "prop-types";

import { getXPosition } from "./selectors.js";

const TreeNodeCircle = ({
  heatmapIndex,
  depth,
  yScale,
  onMouseEnter,
  onMouseLeave,
  onMouseClick,
  isHighlighted,
  style
}) => (
  <circle
    cx={getXPosition(depth)}
    cy={yScale(heatmapIndex)}
    r={isHighlighted ? style.treeNodeRadius + 1 : style.treeNodeRadius}
    fill={isHighlighted ? style.treeHighlightColor : style.treeNodeColor}
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
  onMouseClick: PropTypes.func.isRequired,

  style: PropTypes.object.isRequired
};

export default TreeNodeCircle;
