import React from "react";
import PropTypes from "prop-types";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { ButtonGroup, Button } from "reactstrap";

import TreeZoomOutButton from "./TreeZoomOutButton/TreeZoomOutButton";
import DownloadCSVButton from "./DownloadCSVButton/DownloadCSVButton";
import DiffDropdown from "./DiffDropdown/DiffDropdown";

import styled from "react-emotion";

const Menu = ({ analysis, width }) => (
  <MenuDiv>
    <MenuTitle analysis={analysis} dashboard={"TREE_CELLSCAPE"} />
    <ButtonGroup>
      <TreeZoomOutButton Button={Button} />
      <DiffDropdown analysis={analysis} />
      <DownloadCSVButton Button={Button} analysis={analysis} />
    </ButtonGroup>
  </MenuDiv>
);

const MenuDiv = styled("div")`
  border-radius: 4px;
  padding-left: 10px;
  margin-bottom: 10px;
  font-size: 20px;
  height: 40px;
  align-items: center;

  & .btn,
  .btn-group {
    height: 100%;
  }
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
  padding: 6px 10px;
  font-size: 20px;
  color: #4f4f4f;
`;

export default Menu;
