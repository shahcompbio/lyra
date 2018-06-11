/**
 * TreeChildren -  React Component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  makeGetTreeElementsByChildren,
  getYScale,
  getOffsetIndex
} from "./selectors.js";

import TreeNode from "./TreeNode";
import TreeChildrenCluster from "./TreeCluster/TreeChildrenCluster";
import TreeVerticalBranch from "./TreeBranch/TreeVerticalBranch";

class TreeChildren extends Component {
  static propTypes = {
    /** childrenElements - list of clusters and nodes*/
    childrenElements: PropTypes.arrayOf(PropTypes.object).isRequired,

    /** depth - current depth of children*/
    depth: PropTypes.number.isRequired,

    /** parentIndex - heatmap index of parent of children*/
    parentIndex: PropTypes.number.isRequired,

    /** yScale*/
    yScale: PropTypes.func.isRequired,

    /** offsetIndex - number of indices to offset clusters by*/
    offsetIndex: PropTypes.number.isRequired,

    /** auntIndex - offsetted heatmap index of adjacent aunt node */
    auntIndex: PropTypes.number
  };

  render() {
    const children = this.props.childrenElements.reduce(
      (children, child) => [child, ...children],
      []
    );
    const {
      offsetIndex,
      depth,
      yScale,
      parentIndex,
      auntIndex,
      offsetBy,
      analysis
    } = this.props;

    let maxIndex = parentIndex;
    let nextSiblingIndex, childJSX;

    const childrenJSX = children.map(child => {
      let newOffsetBy = getOffsetByIndex(
        child,
        offsetIndex,
        offsetBy,
        auntIndex,
        nextSiblingIndex
      );

      if (isChildNode(child)) {
        childJSX = drawTreeNode(
          analysis,
          child,
          depth,
          nextSiblingIndex,
          newOffsetBy,
          yScale
        );
        maxIndex = Math.max(maxIndex, getChildIndex(child) - newOffsetBy);
      } else {
        const clusterHeight = getClusterIndexHeight(child, offsetIndex);
        childJSX = drawTreeCluster(
          child,
          clusterHeight,
          depth,
          yScale,
          newOffsetBy,
          parentIndex
        );
        maxIndex = Math.max(
          maxIndex,
          getChildIndex(child) + clusterHeight - newOffsetBy,
          parentIndex + clusterHeight
        );
      }

      nextSiblingIndex = getChildIndex(child) - newOffsetBy;
      return childJSX;
    });

    const verticalBranch = drawTreeVerticalBranch(
      parentIndex,
      maxIndex,
      depth,
      yScale
    );

    return (
      <g>
        {verticalBranch}
        {childrenJSX.reverse()}
      </g>
    );
  }
}

/**
 * Determines whether current child is a node (true) or cluster (false)
 * @param {object} child
 * @return {bool}
 */
const isChildNode = child => child.hasOwnProperty("id");

/**
 * Returns the index (or start index, if cluster) of current child
 * @param {object} child
 * @return {int}
 */
const getChildIndex = child =>
  isChildNode(child) ? child["index"] : child["startIndex"];

/**
 * Returns offset for current child
 * @param {object} child
 * @param {int} offsetIndex - how much to offset if needed
 * @param {int} offsetBy - current total offset
 * @param {int} auntIndex - offsetted index of aunt node
 * @param {int} nextSiblingIndex - offsetted index of next sibling
 * @return {int}
 */
const getOffsetByIndex = (
  child,
  offsetIndex,
  offsetBy,
  auntIndex,
  nextSiblingIndex
) => {
  const comparingIndex = auntIndex === undefined ? nextSiblingIndex : auntIndex;
  const childIndex =
    (isChildNode(child) ? child["index"] : child["endIndex"]) - offsetBy;

  if (comparingIndex === undefined) {
    return offsetBy;
  } else {
    return childIndex + offsetIndex > comparingIndex
      ? Math.abs(comparingIndex - childIndex) + offsetIndex + offsetBy
      : offsetBy;
  }
};

/**
 * Returns height for cluster, with offset if needed
 * @param {object} clusterDimensions
 * @param {int} offsetIndex - how much to offset if needed
 * @return {int}
 */
const getClusterIndexHeight = (clusterDimensions, offsetIndex) => {
  const { startIndex, endIndex } = clusterDimensions;

  const currHeight = endIndex - startIndex;

  return currHeight - offsetIndex < 0 ? currHeight : currHeight - offsetIndex;
};

/**
 * Drawing modules
 */

/**
 * Returns JSX for a cluster
 * @param {object} clusterDimensions
 * @param {int} depth - current
 * @param {func} yScale
 * @param {int} clusterIndex - index where cluster point should touch branch
 * @return {JSX}
 */
const drawTreeCluster = (
  clusterDimensions,
  clusterHeight,
  depth,
  yScale,
  offsetBy,
  parentIndex
) => (
  <TreeChildrenCluster
    key={clusterDimensions.startIndex}
    minIndex={clusterDimensions.startIndex}
    maxIndex={clusterDimensions.endIndex}
    parentIndex={parentIndex}
    clusterHeight={clusterHeight}
    depth={depth}
    yScale={yScale}
    maxHeight={clusterDimensions.maxHeight}
    offsetBy={offsetBy}
  />
);

/**
 * Return JSX for tree node
 * @param {object} currNode
 * @param {int} depth
 * @return {JSX}
 */
const drawTreeNode = (
  analysis,
  currNode,
  depth,
  siblingIndex,
  offsetBy,
  yScale
) => (
  <TreeNode
    analysis={analysis}
    key={currNode["index"]}
    nodeID={currNode["id"]}
    depth={depth}
    siblingIndex={siblingIndex}
    offsetBy={offsetBy}
    yScale={yScale}
  />
);

/**
 * Return JSX for connecting vertical branch
 * @param {int} minIndex
 * @param {int} maxIndex
 * @param {int} depth
 * @param {func} yScale
 * @return {JSX}
 */
const drawTreeVerticalBranch = (minIndex, maxIndex, depth, yScale) => (
  <TreeVerticalBranch
    minIndex={minIndex}
    maxIndex={maxIndex}
    depth={depth - 1}
    yScale={yScale}
  />
);

/**
 * MapState Factory function for Tree Children (use of Reselect)
 * @return {func} mapState
 */
const makeMapState = () => {
  const getTreeElements = makeGetTreeElementsByChildren();
  const mapState = (state, ownProps) => ({
    childrenElements: getTreeElements(state, ownProps.children),
    yScale: getYScale(state),
    offsetIndex: getOffsetIndex(state)
  });
  return mapState;
};

export default connect(makeMapState)(TreeChildren);
