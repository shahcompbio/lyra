import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getIsPloidyNormalized } from "./selectors.js";
import { switchNormalizePloidy } from "./actions.js";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faLevelDownAlt } from "@fortawesome/fontawesome-free-solid";

const NormalizePloidyButton = ({ analysis, isDisabled, Button }) => (
  <Query query={HAS_PLOIDY_QUERY} variables={{ analysis }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return null;
      console.log(switchNormalizePloidy);
      return (
        <ConnectPloidyButton isDisabled={!data.hasPloidy} Button={Button} />
      );
    }}
  </Query>
);

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
  ({ isActive, isDisabled, onClick, Button }) => (
    <Button
      disabled={isDisabled}
      title="Normalize Ploidy"
      onClick={onClick}
      active={isActive}
    >
      <FontAwesomeIcon icon={faLevelDownAlt} size="2x" />
    </Button>
  )
);

export default NormalizePloidyButton;
