import React from "react";

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

export default ChromAxisItem;
