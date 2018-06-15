import React from "react";

import State from "./State/State";

import config from "./config.js";

const Legend = ({ analysis }) => (
  <svg width={config["width"]} height={config["height"]}>
    <State />
  </svg>
);

export default Legend;
