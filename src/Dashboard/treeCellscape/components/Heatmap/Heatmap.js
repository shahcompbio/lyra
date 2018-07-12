/**
 * Heatmap -  React Component
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import {
  getHeatmapIndices,
  getCurrRootID,
  getIsDiffsModeOn
} from "./selectors.js";

import HeatmapRow from "./HeatmapRow/HeatmapRow.js";
import ChromAxis from "./ChromAxis/ChromAxis.js";

import config from "./config.js";

const CHROMOSOME_SEGS_QUERY = gql`
  query chromosomes_segs(
    $analysis: String!
    $indices: [Int!]!
    $isNorm: Boolean!
  ) {
    chromosomes(analysis: $analysis) {
      id
      start
      end
    }
    segs(analysis: $analysis, indices: $indices, isNorm: $isNorm) {
      id
      name
      index
      ploidy
      segs {
        chromosome
        start
        end
        state
      }
    }
  }
`;

const Heatmap = ({ analysis, indices, rootID, isDiffOn }) =>
  rootID === "" ? null : (
    <Query
      query={CHROMOSOME_SEGS_QUERY}
      variables={{ analysis, indices, isNorm: isDiffOn }}
    >
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return null;

        const { chromosomes, segs } = data;

        const segRows = segs.map(seg => {
          const { id, name, ...segData } = seg;

          const rowData = { ...segData, id: name };
          return (
            <HeatmapRow
              key={rowData["id"]}
              rowData={rowData}
              chromosomes={chromosomes}
              isDiffOn={isDiffOn}
            />
          );
        });

        return (
          <svg
            width={config["width"]}
            height={config["height"]}
            x={config["x"]}
          >
            {segRows}
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
  indices: getHeatmapIndices(state),
  isDiffOn: getIsDiffsModeOn(state)
});

Heatmap.propTypes = {
  analysis: PropTypes.string.isRequired,

  indices: PropTypes.arrayOf(PropTypes.number.isRequired),

  rootID: PropTypes.string,

  isDiffOn: PropTypes.bool.isRequired
};

export default connect(mapState)(Heatmap);
