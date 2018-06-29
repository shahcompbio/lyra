import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getHighlightedElement,
  getHighlightedIndex,
  getHighlightedRange,
  getHighlightedData,
  getHighlightedSegment,
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

Tooltip.propTypes = {
  analysis: PropTypes.string
};

/**
 * Tooltip with text
 */
const TooltipText = ({ element, index, range, data, segment }) => {
  if (isCluster(element))
    return <Tooltip text={`Descendents: ${getNumDescendents(range)}`} />;

  if (isRow(element))
    return <Tooltip text={`${dataToText({ ...data, ...segment })}`} />;

  if (isClade(element))
    return (
      <Tooltip
        text={`${dataToText(data)} \n Descendents: ${getNumDescendents(range)}`}
      />
    );

  return null;
};

/**
 * Helpers
 */
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
  data: getHighlightedData(state),
  segment: getHighlightedSegment(state)
});

export default connect(mapState)(TooltipText);
