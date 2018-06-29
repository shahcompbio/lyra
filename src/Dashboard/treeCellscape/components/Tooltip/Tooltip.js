import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getHighlightedElement,
  getHighlightedIndex,
  getHighlightedRange,
  getHighlightedChromosome,
  getHighlightedData,
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

const TooltipText = ({ analysis, element, index, range, chromosome, data }) => {
  if (isCluster(element))
    return <Tooltip text={`Descendents: ${getNumDescendents(range)}`} />;

  if (isRow(element))
    return (
      <Tooltip text={`${dataToText(data)} \n Chromosome: ${chromosome}`} />
    );

  if (isClade(element))
    return (
      <Tooltip
        text={`${dataToText(data)} \n Descendents: ${getNumDescendents(range)}`}
      />
    );

  return null;
};

const getNumDescendents = range => range[1] - range[0] + 1;

const dataToText = data => {
  const idText = `ID: ${data.id}`;

  return Object.keys(data).reduce(
    (str, key) =>
      key === "id" ? str : `${str} \n ${capitalizeText(key)}: ${data[key]}`,
    idText
  );
};

const capitalizeText = text => text.charAt(0).toUpperCase() + text.substr(1);

/**
 * MapState function
 */
const mapState = state => ({
  element: getHighlightedElement(state),
  index: getHighlightedIndex(state),
  range: getHighlightedRange(state),
  chromosome: getHighlightedChromosome(state),
  data: getHighlightedData(state)
});

export default connect(mapState)(TooltipText);
