import { combineReducers } from "redux";
import createReducer from "utils/createReducer.js";
import actions from "./types.js";

const initialOrder = [];
const order = createReducer(initialOrder)({
  [actions.fetchAllAnalysisSuccess]: (state, action) => [
    ...state,
    ...action.analyses.map(analysis => analysis.id)
  ]
});

const initialData = {};
const data = createReducer(initialData)({
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

const initialDashboard = null;
const selectedDashboard = createReducer(initialDashboard)({
  [actions.selectAnalysis]: (state, action) => action.dashboard
});

const initialSelectedID = null;
const selectedID = createReducer(initialSelectedID)({
  [actions.selectAnalysis]: (state, action) => action.id
});

const initialDashboards = [];
const dashboards = createReducer(initialDashboards)({
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
