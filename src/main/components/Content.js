import React from "react";
import { connect } from "react-redux";
import { getSelectedAnalysis } from "./selectors.js";
import TreeCellscape from "treeCellscape/TreeCellscape.js";

const Content = ({ selectedAnalysis }) =>
  selectedAnalysis.id === null ? null : <TreeCellscape />;

const mapState = state => ({
  selectedAnalysis: getSelectedAnalysis(state)
});

export default connect(mapState)(Content);
