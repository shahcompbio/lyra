import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getIsDiffsModeOn } from "./selectors.js";
import { switchDiffsByMode } from "./actions.js";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { DropdownItem } from "reactstrap";

const Mode = ({ analysis }) => (
  <Query query={HAS_DIFFS_QUERY} variables={{ analysis }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return null;
      return data.hasDiffs ? <ConnectMode /> : null;
    }}
  </Query>
);

Mode.propTypes = {
  analysis: PropTypes.string.isRequired
};

const HAS_DIFFS_QUERY = gql`
  query hasDiffs($analysis: String!) {
    hasDiffs(analysis: $analysis)
  }
`;

const mapState = state => ({
  isActive: getIsDiffsModeOn(state)
});

const mapDispatch = dispatch => ({
  onClick: () => dispatch(switchDiffsByMode())
});

const ConnectMode = connect(mapState, mapDispatch)(({ isActive, onClick }) => (
  <DropdownItem onClick={onClick} active={isActive}>
    By Mode CN Profile
  </DropdownItem>
));

export default Mode;
