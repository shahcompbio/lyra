import React from "react";
import { connect } from "react-redux";
import { getSelectedAnalysis } from "./selectors.js";
import TreeCellscape from "treeCellscape/TreeCellscape.js";

import styled, { css } from "react-emotion";

const Content = ({ selectedAnalysis }) =>
  selectedAnalysis.id === null ? null : (
    <ContentDiv>
      <TreeCellscape />
    </ContentDiv>
  );

const ContentDiv = styled("div")`
  width: 90%;
  margin-top: 5px;
  text-align: left;
  margin-left: 100px;
`;

const mapState = state => ({
  selectedAnalysis: getSelectedAnalysis(state)
});

export default connect(mapState)(Content);
