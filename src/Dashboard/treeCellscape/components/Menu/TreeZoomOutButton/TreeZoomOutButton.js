import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { isCurrRootAtRoot } from "./selectors.js";
import { unsetTreeRoot } from "./actions.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchMinus } from "@fortawesome/free-solid-svg-icons";

const TreeZoomOutButton = ({ isDisabled, onClick, Button }) => (
  <Button disabled={isDisabled} onClick={onClick} title="Zoom Out">
    <FontAwesomeIcon icon={faSearchMinus} size="2x" />
  </Button>
);

TreeZoomOutButton.propTypes = {
  isDisabled: PropTypes.bool.isRequired,

  onClick: PropTypes.func.isRequired,

  Button: PropTypes.func.isRequired
};

export default connect(
  state => ({ isDisabled: isCurrRootAtRoot(state) }),
  dispatch => ({ onClick: () => dispatch(unsetTreeRoot()) })
)(TreeZoomOutButton);
