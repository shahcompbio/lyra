import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getCurrTreeRootID } from "./components/Tree/selectors.js";
import { fetchTreeRoot } from "./components/Tree/actions.js";
import TreeZoomOutButton from "./components/TreeZoomOutButton/TreeZoomOutButton";
import Tree from "./components/Tree/Tree";
import Heatmap from "./components/Heatmap/Heatmap";

import Tooltip from "./components/Tooltip/Tooltip";

import { config } from "./config.js";
const { width, height } = config;

class TreeCellscape extends Component {
  componentDidMount() {
    this.props.fetchTreeRoot();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.rootID !== this.props.rootID;
  }

  render() {
    const { rootID } = this.props;
    return rootID === "" ? (
      ""
    ) : (
      <div>
        <TreeZoomOutButton />
        <div>
          <svg width={width} height={height}>
            <Tree rootID={rootID} />
            <Heatmap />
          </svg>
          <Tooltip />
        </div>
      </div>
    );
  }
}

const mapState = state => ({ rootID: getCurrTreeRootID(state) });

const mapDispatch = dispatch => bindActionCreators({ fetchTreeRoot }, dispatch);

export default connect(mapState, mapDispatch)(TreeCellscape);
