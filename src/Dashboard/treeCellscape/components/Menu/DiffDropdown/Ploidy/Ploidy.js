import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getIsPloidyNormalized } from "./selectors.js";
import { switchNormalizePloidy } from "./actions.js";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { MenuItem } from "react-bootstrap";

const Ploidy = ({ analysis }) => (
  <Query query={HAS_PLOIDY_QUERY} variables={{ analysis }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return null;
      return data.hasPloidy ? <ConnectPloidyButton /> : null;
    }}
  </Query>
);

Ploidy.propTypes = {
  analysis: PropTypes.string.isRequired
};

const HAS_PLOIDY_QUERY = gql`
  query hasPloidy($analysis: String!) {
    hasPloidy(analysis: $analysis)
  }
`;

const mapState = state => ({
  isActive: getIsPloidyNormalized(state)
});

const mapDispatch = dispatch => ({
  onClick: () => dispatch(switchNormalizePloidy())
});

const ConnectPloidyButton = connect(mapState, mapDispatch)(
  ({ isActive, onClick }) => (
    <MenuItem onClick={onClick} active={isActive}>
      By Ploidy
    </MenuItem>
  )
);

export default Ploidy;
