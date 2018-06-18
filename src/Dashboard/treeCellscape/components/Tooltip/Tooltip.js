import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Query } from "react-apollo";
import gql from "graphql-tag";
import {
  getHighlightedElement,
  getHighlightedIndex,
  getHighlightedRange,
  getHighlightedChromosome,
  getHighlightedID,
  isClade,
  isCluster,
  isRow
} from "./selectors.js";
import ReactTooltip from "react-tooltip";

const Tooltip = ({ text }) => (
  <ReactTooltip
    getContent={() =>
      text.split("\n").map(item => (
        <span key={item}>
          {item}
          <br />
        </span>
      ))
    }
  />
);

/**
 * PropTypes
 */
Tooltip.propTypes = {
  text: PropTypes.string
};

const clusterRenderProp = ({ loading, error, data }) => {
  if (loading) return null;
  if (error) return null;

  return (
    <Tooltip
      text={`${data.treeNode.id} \n Children: ${
        data.treeNode.children.length
      } \n Descendants: ${data.treeNode.maxIndex - data.treeNode.index}`}
    />
  );
};

const TooltipText = ({ analysis, element, index, range, chromosome, id }) => {
  if (isCluster(element))
    return <Tooltip text={range[1] - range[0] + 1 + " descendents"} />;

  if (isRow(element))
    return <Tooltip text={`ID: ${id} \n Chromosome: ${chromosome}`} />;

  if (isClade(element))
    return (
      <Query query={CLUSTER_QUERY} variables={{ analysis, index }}>
        {clusterRenderProp}
      </Query>
    );

  return null;
};

const CLUSTER_QUERY = gql`
  query treeNode($analysis: String!, $index: Int!) {
    treeNode(analysis: $analysis, index: $index) {
      id
      index
      maxIndex
      children {
        id
      }
    }
  }
`;

/**
 * MapState function
 */
const mapState = state => ({
  element: getHighlightedElement(state),
  index: getHighlightedIndex(state),
  range: getHighlightedRange(state),
  chromosome: getHighlightedChromosome(state),
  id: getHighlightedID(state)
});

export default connect(mapState)(TooltipText);
