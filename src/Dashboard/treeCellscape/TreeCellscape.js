import React from "react";

import Menu from "./components/Menu/Menu.js";
import Tree from "./components/Tree/Tree";
import Heatmap from "./components/Heatmap/Heatmap";

import Tooltip from "./components/Tooltip/Tooltip";

import { config } from "./config.js";
const { width, height } = config;

const TreeCellscape = () => (
  <div>
    <Menu width={width} />
    <div>
      <svg width={width} height={height}>
        <Tree />
        <Heatmap />
      </svg>
      <Tooltip />
    </div>
  </div>
);

export default TreeCellscape;
