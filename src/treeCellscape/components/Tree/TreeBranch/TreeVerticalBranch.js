/**
 * TreeVerticalBranch presentational component
 */

import React from "react";
import PropTypes from "prop-types";

import { getXPosition } from "./selectors.js";

const TreeVerticalBranch = ({
  minIndex,
  maxIndex,
  depth,
  yScale,
  treeBranchColor,
  treeVerticalBranchWidth,
  treeNodeRadius,
  treeHorizontalBranchWidth
}) => {
  const xPos = getXPosition(depth);
  const y1 = Math.round(yScale(minIndex));
  const y2 = Math.round(yScale(maxIndex));
  const horizontalBranchWidthOffset = Math.floor(treeHorizontalBranchWidth / 2);

  return y2 - y1 <= treeNodeRadius ? null : (
    <line
      x1={xPos}
      y1={y1 + treeNodeRadius}
      x2={xPos}
      y2={y2 + horizontalBranchWidthOffset}
      stroke={treeBranchColor}
      strokeWidth={treeVerticalBranchWidth}
    />
  );
};

/**
 * PropTypes
 */
TreeVerticalBranch.propTypes = {
  /** minIndex, maxIndex - heatmap indices where line should start and end */
  minIndex: PropTypes.number.isRequired,
  maxIndex: PropTypes.number.isRequired,

  /** depth */
  depth: PropTypes.number.isRequired,

  /** yScale */
  yScale: PropTypes.func.isRequired
};

export default TreeVerticalBranch;
