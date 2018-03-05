import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getCurrTreeRootID } from "./selectors.js";
import { fetchTreeRoot } from "./actions.js";

import TreeNode from "./TreeNode";

import config from "./config.js";

const Tree = ({ rootID }) => (
  <svg width={config["width"]} height={config["height"]} x={config["x"]}>
    <TreeNode nodeID={rootID} />
  </svg>
);

export default Tree;
