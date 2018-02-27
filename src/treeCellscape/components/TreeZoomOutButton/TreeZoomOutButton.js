import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { isCurrRootAtRoot } from "./selectors.js";
import { unsetTreeRoot } from "./actions.js";

const TreeZoomOutButton = ({ isDisabled, onClick }) => (
  <button disabled={isDisabled} onClick={onClick}>
    Zoom Out
  </button>
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
