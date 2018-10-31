import React from "react";
import { connect } from "react-redux";
import { getSelectedDashboard } from "./selectors.js";
import Dashboard from "Dashboard/Dashboard.js";

import styled from "react-emotion";

const Content = ({
  selectedDashboard,
  match,
  analysis,
  history
}) => {
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
  selectedDashboard: getSelectedDashboard(state)
});

export default connect(mapState)(Content);
