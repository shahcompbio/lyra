import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getCurrRootID, getYScale } from "./selectors.js";
import { setTreeRoot } from "./actions.js";

import TreeNode from "./TreeNode";

import config from "./config.js";
/**
 * Tree Root
 */

class TreeRoot extends Component {
  static propTypes = {
    trueRootID: PropTypes.string.isRequired,
    trueIndex: PropTypes.number.isRequired,
    trueMaxIndex: PropTypes.number.isRequired,

    analysis: PropTypes.string.isRequired,
    setTreeRoot: PropTypes.func.isRequired,

    currRootID: PropTypes.string,
    yScale: PropTypes.func
  };

  componentDidMount() {
    const { trueRootID, trueIndex, trueMaxIndex, setTreeRoot } = this.props;
    setTreeRoot(trueRootID, trueIndex, trueMaxIndex);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.currRootID !== this.props.currRootID;
  }

  render() {
    if (!this.props.currRootID) {
      return null;
    }

    const { analysis, currRootID, yScale } = this.props;
    return (
      <svg width={config["width"]} height={config["height"]} x={config["x"]}>
        <TreeNode
          analysis={analysis}
          nodeID={currRootID}
          isRoot
          yScale={yScale}
        />
      </svg>
    );
  }
}

const mapState = state => ({
  currRootID: getCurrRootID(state),
  yScale: getYScale(state)
});

const mapDispatch = dispatch => bindActionCreators({ setTreeRoot }, dispatch);

export default connect(mapState, mapDispatch)(TreeRoot);
