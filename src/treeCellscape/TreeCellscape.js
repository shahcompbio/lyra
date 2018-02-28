import React from "react";

import TreeZoomOutButton from "./components/TreeZoomOutButton/TreeZoomOutButton";
import Tree from "./components/Tree/Tree";
import Heatmap from "./components/Heatmap/Heatmap";

import Tooltip from "./components/Tooltip/Tooltip";

import { config } from "./config.js";
const { width, height } = config;

const TreeCellscape = () => (
  <div>
    <TreeZoomOutButton />
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
