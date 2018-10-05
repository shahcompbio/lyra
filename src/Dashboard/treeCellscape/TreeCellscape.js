import React from "react";
import { connect } from "react-redux";

import Menu from "./components/Menu/Menu";
import Legend from "./components/Legend/Legend";
import Tree from "./components/Tree/Tree";
import Heatmap from "./components/Heatmap/Heatmap";

import Tooltip from "./components/Tooltip/Tooltip";

import { getSelectedAnalysis } from "./selectors.js";

import { componentConfig as config } from "./config.js";
const { width, height } = config;

const TreeCellscape = ({ analysis }) => (
  <div>
    <Menu analysis={analysis} width={width} />
    <div>
      <svg width={width} height={height}>
        <Legend analysis={analysis} />
        <Tree analysis={analysis} />
        <Heatmap analysis={analysis} />
      </svg>
      <Tooltip analysis={analysis} />
    </div>
  </div>
);

const mapState = state => ({
  analysis: getSelectedAnalysis(state)
});

export default TreeCellscape;
