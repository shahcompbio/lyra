import treeCellscape, {
  stateSelectors as treeCellscapeStateSelectors
} from "Dashboard/reducer.js";
import analyses, {
  stateSelectors as analysesStateSelectors
} from "./analyses/reducer.js";
import dashboards, {
  stateSelectors as dashboardsStateSelectors
} from "./dashboards/reducer.js";

import { combineReducers } from "redux";
import actions from "./types.js";

import shiftSelectors from "utils/shiftSelectors.js";

const dashboardReducer = combineReducers({
  treeCellscape,
  analyses,
  dashboards
});

const reducer = (state, action) => {
  if (action.type === actions.resetDashboard) {
    state.treeCellscape = undefined;
  }
  return dashboardReducer(state, action);
};

/**
 * State Selectors
 */

const getTreeCellscape = state => state.treeCellscape;
const getAnalyses = state => state.analyses;
const getDashboards = state => state.dashboards;

export const stateSelectors = {
  getTreeCellscape,
  ...shiftSelectors(getTreeCellscape, treeCellscapeStateSelectors),
  getAnalyses,
  ...shiftSelectors(getAnalyses, analysesStateSelectors),
  getDashboards,
  ...shiftSelectors(getDashboards, dashboardsStateSelectors)
};

export default reducer;
