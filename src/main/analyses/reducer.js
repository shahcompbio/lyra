import { combineReducers } from "redux";
import createReducer from "utils/createReducer.js";
import actions from "./types.js";

export const initialOrder = [];
export const order = createReducer(initialOrder)({
  [actions.fetchAllAnalysisSuccess]: (state, action) => [
    ...state,
    ...action.analyses.map(analysis => analysis.id)
  ]
});

export const initialData = {};
export const data = createReducer(initialData)({
  [actions.fetchAllAnalysisSuccess]: (state, action) => ({
    ...state,
    ...action.analyses.reduce(
      (data, analysis) => ({
        ...data,
        [analysis["id"]]: analysis
      }),
      {}
    )
  })
});

export const initialSelectedDashboard = null;
export const selectedDashboard = createReducer(initialSelectedDashboard)({
  [actions.selectAnalysis]: (state, action) => action.dashboard
});

export const initialSelectedID = null;
export const selectedID = createReducer(initialSelectedID)({
  [actions.selectAnalysis]: (state, action) => action.id
});

export const initialDashboards = [];
export const dashboards = createReducer(initialDashboards)({
  [actions.fetchAllAnalysisSuccess]: (state, action) =>
    action.analyses.reduce(
      (uniqueDashboards, analysis) =>
        uniqueDashboards.indexOf(analysis.dashboard) === -1
          ? [...uniqueDashboards, analysis.dashboard]
          : uniqueDashboards,
      [...state]
    )
});

const reducer = combineReducers({
  selectedID,
  selectedDashboard,
  data,
  order,
  dashboards
});

/**
 * State Selectors
 */

const getSelectedAnalysisID = state => state.selectedID;
const getSelectedAnalysisDashboard = state => state.selectedDashboard;
const getAnalysesOrder = state => state.order;
const getAnalysesData = state => state.data;
const getDashboards = state => state.dashboards;

export const stateSelectors = {
  getDashboards,
  getSelectedAnalysisID,
  getSelectedAnalysisDashboard,
  getAnalysesOrder,
  getAnalysesData
};

export default reducer;
