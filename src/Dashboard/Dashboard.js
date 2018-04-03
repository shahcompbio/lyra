import React from "react";
import { connect } from "react-redux";

import { getSelectedDashboard } from "main/stateSelectors.js";
import TreeCellscape from "./treeCellscape/TreeCellscape.js";

const Dashboard = ({ dashboard }) =>
  dashboard === null ? null : <TreeCellscape />;

const mapState = state => ({
  dashboard: getSelectedDashboard(state)
});

export default connect(mapState)(Dashboard);
