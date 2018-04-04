import dashboard, {
  stateSelectors as dashboardStateSelectors
} from "Dashboard/reducer.js";
import analyses, {
  stateSelectors as analysesStateSelectors
} from "./analyses/reducer.js";
import dashboards from "./dashboards/reducer.js";

import { combineReducers } from "redux";
import actions from "./types.js";

import shiftSelectors from "utils/shiftSelectors.js";

const dashboardReducer = combineReducers({
  dashboard,
  analyses,
  dashboards
});

const reducer = (state, action) => {
  if (action.type === actions.resetDashboard) {
    state.dashboard = undefined;
  }
  return dashboardReducer(state, action);
};

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
