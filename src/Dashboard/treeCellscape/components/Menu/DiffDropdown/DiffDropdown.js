import React from "react";
import PropTypes from "prop-types";
import { DropdownButton } from "react-bootstrap";

import Ploidy from "./Ploidy/Ploidy";
import Mode from "./Mode/Mode";

const DiffDropdown = ({ analysis }) => (
  <DropdownButton title={"Diff Heatmap"} id={`dropdown-basic-diff`}>
    <Ploidy analysis={analysis} />
    <Mode analysis={analysis} />
  </DropdownButton>
);

DiffDropdown.propTypes = {
  analysis: PropTypes.string.isRequired
};

export default DiffDropdown;
