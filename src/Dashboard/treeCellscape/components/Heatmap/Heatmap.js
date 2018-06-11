/**
 * Heatmap -  React Component
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { getHeatmapIndices, getCurrRootID } from "./selectors.js";

import HeatmapRow from "./HeatmapRow/HeatmapRow.js";
import ChromAxis from "./ChromAxis/ChromAxis.js";

import config from "./config.js";

const CHROMOSOME_SEGS_QUERY = gql`
  query chromosomes_segs($analysis: String!, $indices: [Int!]!) {
    chromosomes(analysis: $analysis) {
      id
      start
      end
    }
    segs(analysis: $analysis, indices: $indices) {
      id
      index
      segs {
        chromosome
        start
        end
        state
        integerMedian
      }
    }
  }
`;

const Heatmap = ({ analysis, indices, rootID }) =>
  rootID === "" ? null : (
    <Query query={CHROMOSOME_SEGS_QUERY} variables={{ analysis, indices }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return null;

        const { chromosomes, segs } = data;

        return (
          <svg
            width={config["width"]}
            height={config["height"]}
            x={config["x"]}
          >
            {segs.map(segRow => (
              <HeatmapRow
                key={segRow["id"]}
                rowData={segRow}
                chromosomes={chromosomes}
              />
            ))}
            <ChromAxis
              y={(segs.length + 1) * config["rowHeight"]}
              chromosomes={chromosomes}
            />
          </svg>
        );
      }}
    </Query>
  );

const mapState = state => ({
  rootID: getCurrRootID(state),
  indices: getHeatmapIndices(state)
});

Heatmap.propTypes = {
  analysis: PropTypes.string.isRequired,

  indices: PropTypes.arrayOf(PropTypes.number.isRequired),

  rootID: PropTypes.string
};

export default connect(mapState)(Heatmap);
