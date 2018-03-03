/**
 * TreeNode -  React Component
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeGetTreeNodeRecordByID, getYScale } from "./selectors.js";

import TreeNodePoint from "./TreeNode/TreeNodePoint";
import TreeChildren from "./TreeChildren";
import TreeHorizontalBranch from "./TreeBranch/TreeHorizontalBranch";

const TreeNode = ({
  nodeID,
  treeNode,
  yScale,
  depth,
  siblingIndex,
  offsetBy
}) => {
  const { heatmapIndex, children, parent, maxDescendantIndex } = treeNode;
  const branch =
    parent === "root" ? (
      ""
    ) : (
      <TreeHorizontalBranch
        heatmapIndex={heatmapIndex - offsetBy}
        depth={depth}
        yScale={yScale}
      />
    );

  return (
    <g>
      {branch}
      <TreeNodePoint
        nodeID={nodeID}
        heatmapIndex={heatmapIndex}
        maxDescendantIndex={maxDescendantIndex}
        depth={depth}
        yScale={yScale}
        offsetBy={offsetBy}
      />
      <TreeChildren
        children={children}
        depth={depth + 1}
        parentIndex={heatmapIndex - offsetBy}
        auntIndex={siblingIndex}
        offsetBy={offsetBy}
      />
    </g>
  );
};
TreeNode.defaultProps = {
  depth: 0,
  offsetBy: 0
};

/**
 * PropTypes
 */
TreeNode.propTypes = {
  /** nodeID*/
  nodeID: PropTypes.string.isRequired,

  /** depth - current depth of node from root */
  depth: PropTypes.number.isRequired,

  /** siblingIndex - offsetted heatmap index of adjacent sibling */
  siblingIndex: PropTypes.number,

  /** offsetBy - number of indices to offset drawing by */
  offsetBy: PropTypes.number.isRequired
};

/**
 * Factory function for mapstate to Tree Node
 */
const makeMapStateForTreeNode = () => {
  const getTreeNodeRecordByID = makeGetTreeNodeRecordByID();
  const mapState = (state, ownProps) => ({
    treeNode: getTreeNodeRecordByID(state, ownProps.nodeID),
    yScale: getYScale(state)
  });
  return mapState;
};

export default connect(makeMapStateForTreeNode())(TreeNode);
