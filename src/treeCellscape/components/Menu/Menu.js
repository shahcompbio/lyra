import React from "react";

import { connect } from "react-redux";
import { getSelectedAnalysis } from "./selectors.js";

import TreeZoomOutButton from "./TreeZoomOutButton/TreeZoomOutButton";
import DownloadCSVButton from "./DownloadCSVButton/DownloadCSVButton";

import styled from "react-emotion";

const Menu = ({ analysis, width }) => (
  <MenuDiv width={width}>
    <Title>{analysis.title}</Title>
    <TreeZoomOutButton Button={Button} />
    <DownloadCSVButton Button={Button} />
  </MenuDiv>
);

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
  padding: 3px;
  border-radius: 5px;
  align-items: center;
`;

const Title = styled("span")`
  margin-top: 2%;
  margin-bottom: 2%;
  margin-right: 2%;
  margin-left: 3px;
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

  &:disabled {
    color: ${colors.disabledText};
    background: ${colors.menu};
  }

  &:hover {
    background: ${props => (props.disabled ? colors.menu : "#c1c1c1")};
  }
`;

const mapState = state => ({
  analysis: getSelectedAnalysis(state)
});

export default connect(mapState)(Menu);
