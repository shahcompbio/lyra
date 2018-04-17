import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getSelectedTitle } from "./selectors.js";

import TreeZoomOutButton from "./TreeZoomOutButton/TreeZoomOutButton";
import DownloadCSVButton from "./DownloadCSVButton/DownloadCSVButton";

import styled from "react-emotion";

const Menu = ({ analysisTitle, width }) => (
  <MenuDiv width={width}>
    <Title>{analysisTitle}</Title>
    <TreeZoomOutButton Button={Button} />
    <DownloadCSVButton Button={Button} />
  </MenuDiv>
);

Menu.propTypes = {
  analysisTitle: PropTypes.string.isRequired,

  width: PropTypes.number.isRequired
};

const colors = {
  menu: "#e0dcdc",
  text: "#4f4f4f",
  disabledText: "#eeeeee"
};

const MenuDiv = styled("div")`
  width: ${props => props.width};
  height: 30px;
  background: ${colors.menu};
  margin-top: 5px;
  margin-bottom: 20px;
  padding: 2px;
  border-radius: 5px;
  align-items: center;
  font-size: 0px;
`;

const Title = styled("span")`
  margin-top: 2%;
  margin-bottom: 2%;
  margin-right: 2%;
  margin-left: 3px;
  font-size: 15px;
  color: ${colors.text};
`;

const Button = styled("button")`
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 4px;
  margin-right: 0.5%;
  border: 0px;
  background: ${colors.menu};
  color: ${colors.text};
  font-size: 10px;

  &:disabled {
    color: ${colors.disabledText};
    background: ${colors.menu};
  }

  &:hover {
    background: ${props => (props.disabled ? colors.menu : "#c1c1c1")};
  }
`;

const mapState = state => ({
  analysisTitle: getSelectedTitle(state)
});

export default connect(mapState)(Menu);
