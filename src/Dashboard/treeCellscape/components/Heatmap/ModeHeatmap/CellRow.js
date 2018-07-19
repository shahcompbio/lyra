import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import Row from "../common/Row.js";

import { getHighlightedIndex } from "./selectors.js";

import config from "./config.js";

const CELL_SEGS_QUERY = gql`
  query segs($analysis: String!, $index: Int!) {
    segs(analysis: $analysis, indices: [$index], isNorm: false) {
      id
      segs {
        chromosome
        start
        end
        state
      }
    }
  }
`;

const CellRow = ({ analysis, chromMap, bpRatio, index }) =>
  index && index !== -1 ? (
    <Query query={CELL_SEGS_QUERY} variables={{ analysis, index: index }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return null;

        const segRow = data.segs;
        const { id, segs } = segRow[0];

        return (
          <g className={`mode-${id}`}>
            <Row
              cellID={id}
              segs={segs}
              y={config["rowHeight"]}
              bpRatio={bpRatio}
              chromMap={chromMap}
              height={config["rowHeight"]}
              colorScale={config["colorScale"]}
            />
          </g>
        );
      }}
    </Query>
  ) : null;

CellRow.propTypes = {
  analysis: PropTypes.string.isRequired,
  chromMap: PropTypes.object.isRequired,
  bpRatio: PropTypes.number.isRequired,
  index: PropTypes.number
};

const mapState = state => ({
  index: getHighlightedIndex(state)
});

export default connect(mapState)(CellRow);
