import React from "react";

import { connect } from "react-redux";
import { getSelectedAnalysis } from "./selectors.js";

import TreeZoomOutButton from "./TreeZoomOutButton/TreeZoomOutButton";

import styled, { css } from "react-emotion";

const Menu = ({ analysis, width }) => (
  <MenuDiv width={width}>
    <Title>{analysis.title}</Title>
    <TreeZoomOutButton Button={Button} />
  </MenuDiv>
);

const MenuDiv = styled("div")`
  width: ${props => props.width};
  height: 30px;
  background: #e0dcdc;
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
  color: #4f4f4f;
`;

const Button = styled("button")`
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 4px;
  border: 0px;
  background: #e0dcdc;
  color: #4f4f4f;

  &:disabled {
    color: #ffffff;
    background: #e0dcdc;
  }

  &:hover {
    background: ${props => (props.disabled ? "#e0dcdc" : "#c1c1c1")};
  }
`;

const mapState = state => ({
  analysis: getSelectedAnalysis(state)
});

export default connect(mapState)(Menu);
