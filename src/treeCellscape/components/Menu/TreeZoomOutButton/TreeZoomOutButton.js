import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { isCurrRootAtRoot } from "./selectors.js";
import { unsetTreeRoot } from "./actions.js";

import styled, { css } from "react-emotion";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSearchMinus } from "@fortawesome/fontawesome-free-solid";

const TreeZoomOutButton = ({ isDisabled, onClick, Button }) => (
  <Button disabled={isDisabled} onClick={onClick} title="Zoom Out">
    <FontAwesomeIcon icon={faSearchMinus} size="2x" />
  </Button>
);

TreeZoomOutButton.propTypes = {
  /** isDisabled */
  isDisabled: PropTypes.bool.isRequired,

  /** onClick */
  onClick: PropTypes.func.isRequired
};

export default connect(
  state => ({ isDisabled: isCurrRootAtRoot(state) }),
  dispatch => ({ onClick: () => dispatch(unsetTreeRoot()) })
)(TreeZoomOutButton);
