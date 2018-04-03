import React from "react";
import PropTypes from "prop-types";

import config from "./config.js";

const ChromAxisItem = ({ chromosome, data, y }) => (
  <text
    x={data["x"] + data["width"] / 2}
    y={y + config["height"]}
    fontSize={"10px"}
    textAnchor={"middle"}
    fill={"#000000"}
  >
    {chromosome}
  </text>
);

ChromAxisItem.propTypes = {
  chromosome: PropTypes.string.isRequired,

  data: PropTypes.object.isRequired,

  y: PropTypes.number.isRequired
};

export default ChromAxisItem;
