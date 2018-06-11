/**
 * TreeNode -  React Component
 */

import React from "react";
import PropTypes from "prop-types";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import TreeNodePoint from "./TreeNode/TreeNodePoint";
import TreeChildren from "./TreeChildren";
import TreeHorizontalBranch from "./TreeBranch/TreeHorizontalBranch";

const TREE_NODE_QUERY = gql`
  query treeNode($analysis: String!, $id: String!) {
    treeNode(analysis: $analysis, id: $id) {
      id
      index
      maxIndex
      parent
      children {
        id
        index
        maxIndex
        maxHeight
      }
    }
  }
`;

const TreeNode = ({
  yScale,
  analysis,
  nodeID,
  depth,
  siblingIndex,
  offsetBy,
  isRoot
}) => (
  <Query query={TREE_NODE_QUERY} variables={{ analysis, id: nodeID }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return null;

      const { index, children, parent, maxIndex } = data.treeNode;
      const branch =
        parent === "root" ? (
          ""
        ) : (
          <TreeHorizontalBranch
            heatmapIndex={index - offsetBy}
            depth={depth}
            yScale={yScale}
          />
        );
      return (
        <g>
          {branch}
          <TreeNodePoint
            nodeID={nodeID}
            heatmapIndex={index}
            maxDescendantIndex={maxIndex}
            depth={depth}
            yScale={yScale}
            offsetBy={offsetBy}
            isRoot={isRoot}
          />
          <TreeChildren
            analysis={analysis}
            children={children}
            depth={depth + 1}
            parentIndex={index - offsetBy}
            auntIndex={siblingIndex}
            offsetBy={offsetBy}
          />
        </g>
      );
    }}
  </Query>
);

/**
 * Tree Node Data Fetcher
 */

TreeNode.defaultProps = {
  depth: 0,
  offsetBy: 0,
  isRoot: false
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

export default TreeNode;
