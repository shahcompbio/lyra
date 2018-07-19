import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ReactTooltip from "react-tooltip";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import Row from "../common/Row.js";

import {
  highlightElement,
  unhighlightElement,
  highlightSegment
} from "./actions.js";

import config from "./config.js";

const MODE_SEGS_QUERY = gql`
  query mode_segs($analysis: String!) {
    modeSegs(analysis: $analysis) {
      chromosome
      start
      end
      state
    }
  }
`;

const ModeRow = ({ analysis, chromMap, bpRatio }) => (
  <Query query={MODE_SEGS_QUERY} variables={{ analysis }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return null;

      const { modeSegs } = data;
      return (
        <ConnectModeRow segs={modeSegs} chromMap={chromMap} bpRatio={bpRatio} />
      );
    }}
  </Query>
);

ModeRow.propTypes = {
  analysis: PropTypes.string.isRequired,
  chromMap: PropTypes.object.isRequired,
  bpRatio: PropTypes.number.isRequired
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

class Mode extends Component {
  componentDidMount() {
    ReactTooltip.rebuild();
  }

  render() {
    const { segs, chromMap, bpRatio } = this.props;

    const onMouseEnter = () => {
      this.props.highlightElement({
        index: -1,
        id: "mode",
        element: "row",
        data: {
          id: "mode"
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
        className={"mode-all"}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-tip
      >
        <Row
          cellID={"mode"}
          segs={segs}
          y={0}
          bpRatio={bpRatio}
          chromMap={chromMap}
          height={config["rowHeight"]}
          colorScale={config["colorScale"]}
          onMouseEnter={onMouseEnterContent}
        />
      </g>
    );
  }
}
const ConnectModeRow = connect(() => ({}), mapDispatch)(Mode);

export default ModeRow;
