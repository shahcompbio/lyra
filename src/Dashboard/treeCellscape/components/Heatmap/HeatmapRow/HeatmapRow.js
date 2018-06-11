/**
 * HeatmapRow container component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import HeatmapRowIndicators from "./HeatmapRowIndicators";
import HeatmapRowContent from "./HeatmapRowContent";
import ReactTooltip from "react-tooltip";

import {
  getYScale,
  getChromPixelMapping,
  getBPRatio,
  makeIsIndexHighlighted,
  getIndicatorXPosition
} from "./selectors.js";
import { highlightElement, unhighlightElement } from "./actions.js";

class HeatmapRow extends Component {
  static propTypes = {
    /** chromosomes */
    chromosomes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,

    /** rowData */
    rowData: PropTypes.object.isRequired,

    /** yScale */
    yScale: PropTypes.func.isRequired,

    /** chromMap */
    chromMap: PropTypes.object.isRequired,

    /** bpRatio */
    bpRatio: PropTypes.number.isRequired,

    /** isHighlighted - whether current row is highlighted */
    isHighlighted: PropTypes.bool.isRequired
  };

  componentDidMount() {
    ReactTooltip.rebuild();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.isHighlighted !== nextProps.isHighlighted ||
      this.props.rowData.index !== nextProps.rowData.index ||
      this.isYPositionsDifferent(this.props, nextProps)
    );
  }

  isYPositionsDifferent(currProps, nextProps) {
    return (
      currProps.yScale(currProps.rowData.index) !==
      nextProps.yScale(nextProps.rowData.index)
    );
  }

  render() {
    const {
      rowData,
      yScale,
      chromMap,
      bpRatio,
      isHighlighted,
      indicatorX
    } = this.props;
    const { index, segs, id } = rowData;
    const y = yScale(index);
    const onMouseEnter = () => {
      this.props.highlightElement({ index, element: "row" });
    };

    const onMouseLeave = () => {
      this.props.unhighlightElement();
    };

    return (
      <g
        className={index}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-tip
      >
        <HeatmapRowContent
          cellID={id}
          segs={segs}
          y={y}
          chromMap={chromMap}
          bpRatio={bpRatio}
        />
        <HeatmapRowIndicators
          cellID={id}
          x={indicatorX}
          y={y}
          isHighlighted={isHighlighted}
        />
      </g>
    );
  }
}

/**
 * MapState function
 */
const makeMapState = () => {
  const isIndexHighlighted = makeIsIndexHighlighted();
  const mapState = (state, ownProps) => ({
    isHighlighted: isIndexHighlighted(state, ownProps.rowData["index"]),
    yScale: getYScale(state),
    chromMap: getChromPixelMapping(state, ownProps.chromosomes),
    bpRatio: getBPRatio(state, ownProps.chromosomes),
    indicatorX: getIndicatorXPosition(state, ownProps.chromosomes)
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

export default connect(makeMapState(), mapDispatch)(HeatmapRow);
