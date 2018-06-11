/**
 * TreeCluster presentational component
 */

import React from "react";
import PropTypes from "prop-types";

import config from "./config.js";

import { getXPosition } from "./selectors.js";

const TreeCluster = ({
  minIndex,
  maxIndex,
  depth,
  maxHeight,
  yScale,
  isHighlighted,
  onMouseEnter,
  onMouseLeave
}) => {
  const x = getXPosition(depth - 1) + config["verticalBranchWidth"] / 2;
  const yMin = yScale(minIndex);
  const yMax = yScale(maxIndex);
  const height = yMax - yMin;
  return (
    <rect
      width={config["clusterWidth"]}
      height={height}
      x={x}
      y={yMin}
      fill={
        isHighlighted
          ? config["highlightColor"]
          : config["clusterColorGradient"][0]
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-tip
    />
  );
};
/**
 * PropTypes
 */
TreeCluster.propTypes = {
  /** minIndex, maxIndex - indices that indicate where points of cluster should be */
  minIndex: PropTypes.number.isRequired,
  maxIndex: PropTypes.number.isRequired,

  /** depth */
  depth: PropTypes.number.isRequired,

  /** maxHeight - length of tallest branch of a node in this cluster */
  maxHeight: PropTypes.number.isRequired,

  /** yScale, clusterColorScale */
  yScale: PropTypes.func.isRequired,

  /** isHighlighted - whether current cluster is highlighted */
  isHighlighted: PropTypes.bool.isRequired,

  /** onMouseEnter, onMouseLeave - event handlers */
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
};

export default TreeCluster;
