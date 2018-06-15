import React from "react";
import PropTypes from "prop-types";

import config from "./config.js";

const ChromAxisItem = ({ chromosome, data, y, index }) => (
  <g>
    <rect
      x={data["x"]}
      y={y + 3}
      width={data["width"]}
      height={config["height"]}
      fill={config["color"][index % 2]}
    />
    <text
      x={data["x"] + data["width"] / 2}
      y={y + config["height"]}
      fontSize={"10px"}
      textAnchor={"middle"}
      fill={"#000000"}
    >
      {chromosome}
    </text>
  </g>
);

ChromAxisItem.propTypes = {
  chromosome: PropTypes.string.isRequired,

  data: PropTypes.object.isRequired,

  y: PropTypes.number.isRequired
};

export default ChromAxisItem;
