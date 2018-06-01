/**
 * TreeChildrenCluster container component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ReactTooltip from "react-tooltip";
import TreeCluster from "./TreeCluster";

import { makeIsIndexRangeHighlighted } from "./selectors.js";
import { highlightElement, unhighlightElement } from "./actions.js";

class TreeChildrenCluster extends Component {
  static propTypes = {
    /** minIndex, maxIndex - min and max indices for cluster (for highlighting) */
    minIndex: PropTypes.number.isRequired,
    maxIndex: PropTypes.number.isRequired,

    /** depth */
    depth: PropTypes.number.isRequired,

    /** clusterHeight - number of indices to be drawn */
    clusterHeight: PropTypes.number.isRequired,

    /** maxHeight - length of tallest branch of a node in this cluster */
    maxHeight: PropTypes.number.isRequired,

    /** yScale, clusterColorScale */
    yScale: PropTypes.func.isRequired,

    /** offsetBy - number of indices to offset clusters by*/
    offsetBy: PropTypes.number.isRequired,

    /** isHighlighted - whether current cluster is highlighted */
    isHighlighted: PropTypes.bool.isRequired
  };

  componentDidMount() {
    ReactTooltip.rebuild();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.isHighlighted !== nextProps.isHighlighted ||
      this.isDifferentCluster(this.props, nextProps)
    );
  }

  isDifferentCluster(currProps, nextProps) {
    return (
      currProps.minIndex !== nextProps.minIndex ||
      currProps.maxIndex !== nextProps.maxIndex ||
      currProps.depth !== nextProps.depth
    );
  }

  render() {
    const {
      minIndex,
      maxIndex,
      clusterHeight,
      maxHeight,
      depth,
      yScale,
      isHighlighted,
      offsetBy,
      parentIndex
    } = this.props;

    const onMouseEnter = () => {
      this.props.highlightElement({
        range: [minIndex, maxIndex],
        element: "cluster"
      });
    };

    const onMouseLeave = () => {
      this.props.unhighlightElement();
    };

    const startingIndex = Math.max(minIndex - offsetBy, parentIndex);

    return (
      <TreeCluster
        minIndex={startingIndex}
        maxIndex={startingIndex + clusterHeight}
        depth={depth}
        yScale={yScale}
        maxHeight={maxHeight}
        isHighlighted={isHighlighted}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  }
}

/**
 * MapState function
 */
const makeMapState = () => {
  const isHighlighted = makeIsIndexRangeHighlighted();
  const mapState = (state, ownProps) => ({
    isHighlighted: isHighlighted(state, ownProps.minIndex, ownProps.maxIndex)
  });
  return mapState;
};

const mapDispatch = dispatch =>
  bindActionCreators(
    {
      highlightElement,
      unhighlightElement
    },
    dispatch
  );

export default connect(makeMapState(), mapDispatch)(TreeChildrenCluster);
