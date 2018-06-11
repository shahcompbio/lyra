import React from "react";
import PropTypes from "prop-types";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import TreeRoot from "./TreeRoot";

/**
 * Tree - React Component
 */

const TREE_ROOT_QUERY = gql`
  query treeRoot($analysis: String!) {
    treeRoot(analysis: $analysis) {
      id
      index
      maxIndex
    }
  }
`;

const Tree = ({ analysis }) => (
  <Query query={TREE_ROOT_QUERY} variables={{ analysis }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return null;

      return (
        <TreeRoot
          trueRootID={data.treeRoot.id}
          trueIndex={data.treeRoot.index}
          trueMaxIndex={data.treeRoot.maxIndex}
          analysis={analysis}
        />
      );
    }}
  </Query>
);

Tree.propTypes = {
  analysis: PropTypes.string.isRequired
};

export default Tree;
