import React from "react";
import { connect } from "react-redux";
import { getSelectedAnalysis } from "./selectors.js";
import TreeCellscape from "treeCellscape/TreeCellscape.js";

import styled, { css } from "react-emotion";

const Content = ({ selectedAnalysis }) =>
  selectedAnalysis.id === null ? null : (
    <ContentDiv>
      <Title>{selectedAnalysis.id}</Title>
      <TreeCellscape />
    </ContentDiv>
  );

const Title = styled("span")`
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px;
  display: inline-block;
`;

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
