import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getCurrTreeRootID } from "./selectors.js";
import { fetchTreeRoot } from "./actions.js";

import TreeNode from "./TreeNode";

import config from "./config.js";

/**
 * Tree - React Component
 */
class Tree extends Component {
  static propTypes = {
    /** ID of tree root - "" if not fetched yet  */
    rootID: PropTypes.string,

    fetchTreeRoot: PropTypes.func.isRequired
  };

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
      <svg width={config["width"]} height={config["height"]} x={config["x"]}>
        <TreeNode nodeID={rootID} />
      </svg>
    );
  }
}

const mapState = state => ({ rootID: getCurrTreeRootID(state) });

const mapDispatch = dispatch => bindActionCreators({ fetchTreeRoot }, dispatch);

export default connect(mapState, mapDispatch)(Tree);
