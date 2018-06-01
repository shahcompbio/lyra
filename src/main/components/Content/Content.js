import React from "react";
import { connect } from "react-redux";
import { getSelectedAnalysis, getSelectedDashboard } from "./selectors.js";
import Dashboard from "Dashboard/Dashboard.js";

import styled from "react-emotion";

const Content = ({ selectedAnalysis, selectedDashboard }) =>
  selectedAnalysis === null || selectedDashboard === null ? null : (
    <ContentDiv>
      <Dashboard />
    </ContentDiv>
  );

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

export default connect(mapState)(Content);
