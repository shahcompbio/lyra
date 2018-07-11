import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getIsDiffsModeOn } from "./selectors.js";
import { switchDiffsByMode } from "./actions.js";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faLevelDownAlt } from "@fortawesome/fontawesome-free-solid";

const DiffByModeButton = ({ analysis, Button }) => (
  <Query query={HAS_DIFFS_QUERY} variables={{ analysis }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return null;
      return (
        <ConnectPloidyButton isDisabled={!data.hasDiffs} Button={Button} />
      );
    }}
  </Query>
);

DiffByModeButton.propTypes = {
  analysis: PropTypes.string.isRequired,

  Button: PropTypes.func.isRequired
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

const ConnectPloidyButton = connect(mapState, mapDispatch)(
  ({ isActive, isDisabled, onClick, Button }) => (
    <Button
      disabled={isDisabled}
      title="Normalize heatmap by copy number mode"
      onClick={onClick}
      active={isActive}
    >
      <FontAwesomeIcon icon={faLevelDownAlt} size="2x" />
    </Button>
  )
);

export default DiffByModeButton;
