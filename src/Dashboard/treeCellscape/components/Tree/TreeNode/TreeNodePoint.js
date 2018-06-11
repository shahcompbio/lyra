/**
 * TreeNodePoint -  React Component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TreeNodeCircle from "./TreeNodeCircle";
import ReactTooltip from "react-tooltip";

import { makeIsIndexHighlighted } from "./selectors.js";
import {
  highlightElement,
  unhighlightElement,
  setTreeRoot,
  unsetTreeRoot
} from "./actions.js";

class TreeNodePoint extends Component {
  static propTypes = {
    /** nodeID*/
    nodeID: PropTypes.string.isRequired,

    /** heatmapIndex */
    heatmapIndex: PropTypes.number.isRequired,

    /** maxDescendantIndex */
    maxDescendantIndex: PropTypes.number.isRequired,

    /** depth */
    depth: PropTypes.number.isRequired,

    /** yScale */
    yScale: PropTypes.func.isRequired,

    /** offsetBy - number of indices to offset drawing by */
    offsetBy: PropTypes.number.isRequired,

    /** isHighlighted - whether current node is highlighted */
    isHighlighted: PropTypes.bool.isRequired
  };

  componentDidMount() {
    ReactTooltip.rebuild();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.isHighlighted !== nextProps.isHighlighted ||
      this.props.heatmapIndex !== nextProps.heatmapIndex
    );
  }

  render() {
    const {
      nodeID,
      heatmapIndex,
      maxDescendantIndex,
      depth,
      yScale,
      isHighlighted,
      offsetBy,
      isRoot
    } = this.props;

    const onMouseEnter = () => {
      this.props.highlightElement({
        index: heatmapIndex,
        range: [heatmapIndex, maxDescendantIndex],
        element: "clade"
      });
    };

    const onMouseLeave = () => {
      this.props.unhighlightElement();
    };

    const onMouseClick = () => {
      isRoot
        ? this.props.unsetTreeRoot()
        : this.props.setTreeRoot(nodeID, heatmapIndex, maxDescendantIndex);
    };

    return (
      <TreeNodeCircle
        heatmapIndex={heatmapIndex - offsetBy}
        depth={depth}
        yScale={yScale}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseClick={onMouseClick}
        isHighlighted={isHighlighted}
      />
    );
  }
}

/**
 * MapState
 */

const makeMapState = () => {
  const isIndexHighlighted = makeIsIndexHighlighted();
  const mapState = (state, ownProps) => ({
    isHighlighted: isIndexHighlighted(state, ownProps.heatmapIndex)
  });

  return mapState;
};

const mapDispatch = dispatch =>
  bindActionCreators(
    {
      highlightElement,
      unhighlightElement,
      setTreeRoot,
      unsetTreeRoot
    },
    dispatch
  );

export default connect(makeMapState(), mapDispatch)(TreeNodePoint);
