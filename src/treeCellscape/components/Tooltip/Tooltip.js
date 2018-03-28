import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getTooltipText } from "./selectors.js";
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

/**
 * MapState function
 */
const mapState = state => ({
  text: getTooltipText(state)
});

export default connect(mapState)(Tooltip);
