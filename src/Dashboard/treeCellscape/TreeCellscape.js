import React from "react";
import { connect } from "react-redux";

import Menu from "./components/Menu/Menu.js";
import Tree from "./components/Tree/Tree";
import Heatmap from "./components/Heatmap/Heatmap";

import Tooltip from "./components/Tooltip/Tooltip";

import { getSelectedAnalysis } from "./selectors.js";

import { config } from "./config.js";
const { width, height } = config;

const TreeCellscape = ({ analysis }) => (
  <div>
    <Menu analysis={analysis} width={width} />
    <div>
      <svg width={width} height={height}>
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

export default connect(mapState)(TreeCellscape);
