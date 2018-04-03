import { combineReducers } from "redux";
import createReducer from "utils/createReducer.js";
import actions from "./types.js";

const initialSelected = "";
const selected = createReducer(initialSelected)({
  [actions.selectDashboard]: (state, action) => action.dashboard
});

const initialDashboards = [];
const dashboards = createReducer(initialDashboards)({
  [actions.fetchAllDashboardSuccess]: (state, action) => action.dashboards
});

const reducer = combineReducers({
  selected,
  dashboards
});

/**
 * State Selectors
 */

const getAllDashboard = state => state.dashboards;
const getSelectedDashboard = state => state.selected;

export const stateSelectors = {
  getAllDashboard,
  getSelectedDashboard
};

export default reducer;
