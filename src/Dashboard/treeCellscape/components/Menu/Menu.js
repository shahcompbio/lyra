import React from "react";
import PropTypes from "prop-types";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import TreeZoomOutButton from "./TreeZoomOutButton/TreeZoomOutButton";
import DownloadCSVButton from "./DownloadCSVButton/DownloadCSVButton";

import styled from "react-emotion";

const Menu = ({ analysis, width }) => (
  <MenuDiv width={width}>
    <MenuTitle analysis={analysis} dashboard={"TREE_CELLSCAPE"} />
    <TreeZoomOutButton Button={Button} />
    <DownloadCSVButton Button={Button} analysis={analysis} />
  </MenuDiv>
);

Menu.propTypes = {
  analysis: PropTypes.string.isRequired,

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

const TITLE_QUERY = gql`
  query analysis($analysis: String!, $dashboard: String!) {
    analysis(analysis: $analysis, dashboard: $dashboard) {
      title
    }
  }
`;

const MenuTitle = ({ analysis, dashboard }) => (
  <Query query={TITLE_QUERY} variables={{ analysis, dashboard }}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return null;

      return <Title>{data.analysis.title}</Title>;
    }}
  </Query>
);

MenuTitle.propTypes = {
  analysis: PropTypes.string.isRequired,

  dashboard: PropTypes.string.isRequired
};
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

export default Menu;
