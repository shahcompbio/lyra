import React from "react";
import Dashboard from "Dashboard/Dashboard.js";

import styled from "react-emotion";

const Content = ({
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

export default Content;
