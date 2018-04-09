import dashboard, {
  stateSelectors as dashboardStateSelectors
} from "Dashboard/reducer.js";
import analyses, {
  stateSelectors as analysesStateSelectors
} from "./analyses/reducer.js";
import dashboards from "./dashboards/reducer.js";

import { combineReducers } from "redux";

import shiftSelectors from "utils/shiftSelectors.js";

const reducer = combineReducers({
  dashboard,
  analyses,
  dashboards
});

/**
 * State Selectors
 */

const getDashboard = state => state.dashboard;
const getAnalyses = state => state.analyses;
const getDashboards = state => state.dashboards;

export const stateSelectors = {
  getDashboard,
  ...shiftSelectors(getDashboard, dashboardStateSelectors),
  getAnalyses,
  ...shiftSelectors(getAnalyses, analysesStateSelectors),
  getDashboards
};

export default reducer;
