/**
 * HeatmapRow container component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import HeatmapRowIndicators from "./HeatmapRowIndicators";
import HeatmapRowAnnotations from "./HeatmapRowAnnotations";
import HeatmapRowContent from "./HeatmapRowContent";
import ReactTooltip from "react-tooltip";

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
  highlightChromosome
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
      this.props.isPloidyNormalized !== nextProps.isPloidyNormalized
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
      isPloidyNormalized
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

    const onMouseEnterChromosome = chrom => {
      this.props.highlightChromosome(chrom);
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
          ploidy={ploidy}
          isPloidyNormalized={isPloidyNormalized}
          onMouseEnter={onMouseEnterChromosome}
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
      highlightChromosome
    },
    dispatch
  );

export default connect(makeMapState(), mapDispatch)(HeatmapRow);
