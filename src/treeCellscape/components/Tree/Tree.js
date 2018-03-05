import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getCurrTreeRootID, getTreeData } from "./selectors.js";
import { fetchTreeRoot, fetchAllTreeNodes } from "./actions.js";

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
    this.props.fetchAllTreeNodes();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.rootID !== this.props.rootID ||
      Object.keys(nextProps.treeNodes).length !==
        Object.keys(this.props.treeNodes).length
    );
  }

  render() {
    const { rootID, treeNodes } = this.props;
    return rootID === "" || Object.keys(treeNodes).length < 2 ? (
      ""
    ) : (
      <svg width={config["width"]} height={config["height"]} x={config["x"]}>
        <TreeNode nodeID={rootID} />
      </svg>
    );
  }
}

const mapState = state => ({
  rootID: getCurrTreeRootID(state),
  treeNodes: getTreeData(state)
});

const mapDispatch = dispatch =>
  bindActionCreators({ fetchTreeRoot, fetchAllTreeNodes }, dispatch);

export default connect(mapState, mapDispatch)(Tree);
