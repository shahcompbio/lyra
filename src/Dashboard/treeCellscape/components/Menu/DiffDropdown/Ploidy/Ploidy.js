import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getIsPloidyNormalized } from "./selectors.js";
import { switchNormalizePloidy } from "./actions.js";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { DropdownItem } from "reactstrap";

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
    <DropdownItem onClick={onClick} active={isActive}>
      By Ploidy
    </DropdownItem>
  )
);

export default Ploidy;
