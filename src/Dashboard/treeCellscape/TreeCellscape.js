import React from "react";
// TODO: remove unused code
// import { connect } from "react-redux";

import Menu from "./components/Menu/Menu";
import Legend from "./components/Legend/Legend";
import Tree from "./components/Tree/Tree";
import Heatmap from "./components/Heatmap/Heatmap";

import Tooltip from "./components/Tooltip/Tooltip";

// TODO: remove unused code
// import { getSelectedAnalysis } from "./selectors.js";

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
// TODO: remove unused code
// const mapState = state => ({
//   analysis: getSelectedAnalysis(state)
// });

export default TreeCellscape;
