import React from "react";
import { connect } from "react-redux";
import { getSelectedAnalysis, getSelectedDashboard } from "./selectors.js";
import Dashboard from "Dashboard/Dashboard.js";

import { withRouter } from "react-router";

import styled from "react-emotion";

const Content = ({
  selectedAnalysis,
  selectedDashboard,
  match,
  location,
  history
}) => {
  const analysis = location.pathname.substr(1);
  return analysis === "" ? null : (
    <ContentDiv>
      <Dashboard analysis={analysis} />
    </ContentDiv>
  );
};

const ContentDiv = styled("div")`
  width: 90%;
  margin-top: 5px;
  text-align: left;
  margin-left: 100px;
`;

const mapState = state => ({
  selectedAnalysis: getSelectedAnalysis(state),
  selectedDashboard: getSelectedDashboard(state)
});

export default withRouter(connect(mapState)(Content));
