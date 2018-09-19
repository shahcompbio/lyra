/**
 * HeatmapRow container component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import HeatmapRowIndicators from "./HeatmapRowIndicators";
import HeatmapRowAnnotations from "./HeatmapRowAnnotations";
import Row from "../common/Row.js";
import ReactTooltip from "react-tooltip";

import config from "./config.js";

import {
  getYScale,
  getChromPixelMapping,
  getBPRatio,
  makeIsIndexHighlighted,
  getIndicatorXPosition,
  getIsPloidyNormalized,
  getAnnotationsX
} from "./selectors.js";
import {
  highlightElement,
  unhighlightElement,
  highlightSegment
} from "./actions.js";

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
      this.isYPositionsDifferent(this.props, nextProps) ||
      this.props.isPloidyNormalized !== nextProps.isPloidyNormalized ||
      this.props.isDiffOn !== nextProps.isDiffOn
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
      indicatorX,
      annotationsX,
      isPloidyNormalized,
      isDiffOn
    } = this.props;
    const { index, segs, id, ploidy } = rowData;
    const y = yScale(index);
    const onMouseEnter = () => {
      this.props.highlightElement({
        index,
        id,
        element: "row",
        data: {
          id,
          ploidy
        }
      });
    };

    const onMouseEnterContent = segment => {
      this.props.highlightSegment({
        chromosome: segment["chromosome"],
        state: segment["state"]
      });
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
        <Row
          cellID={id}
          segs={segs}
          y={y}
          bpRatio={bpRatio}
          chromMap={chromMap}
          height={config["rowHeight"]}
          onMouseEnter={onMouseEnterContent}
          colorScale={
            isDiffOn
              ? config["ploidyColorScale"]
              : isPloidyNormalized
                ? config["ploidyColorScale2"]
                : config["colorScale"]
          }
          stateOffset={isPloidyNormalized ? ploidy : 1}
        />
        <HeatmapRowAnnotations
          cellID={id}
          ploidy={ploidy}
          isPloidyNormalized={isPloidyNormalized}
          y={y}
          x={annotationsX}
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
    annotationsX: getAnnotationsX(state, ownProps.chromosomes),
    indicatorX: getIndicatorXPosition(state, ownProps.chromosomes),
    isPloidyNormalized: getIsPloidyNormalized(state)
  });

  return mapState;
};

const mapDispatch = dispatch =>
  bindActionCreators(
    {
      highlightElement,
      unhighlightElement,
      highlightSegment
    },
    dispatch
  );

export default connect(makeMapState(), mapDispatch)(HeatmapRow);
