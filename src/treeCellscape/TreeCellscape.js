import React from "react";

import TreeZoomOutButton from "./components/TreeZoomOutButton/TreeZoomOutButton";
import Tree from "./components/tree/Tree";
import Heatmap from "./components/heatmap/Heatmap";

import Tooltip from "./components/Tooltip";

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
