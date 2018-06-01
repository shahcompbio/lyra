import dashboard, {
  stateSelectors as dashboardStateSelectors
} from "Dashboard/reducer.js";
import actions from "./types.js";
import createReducer from "utils/createReducer.js";
import { combineReducers } from "redux";

import shiftSelectors from "utils/shiftSelectors.js";

export const initialSelectedAnalysis = null;
export const selectedAnalysis = createReducer(initialSelectedAnalysis)({
  [actions.selectAnalysis]: (state, action) => action.analysis
});

const reducer = combineReducers({
  dashboard,
  selectedAnalysis
});

/**
 * State Selectors
 */

const getDashboard = state => state.dashboard;
const getSelectedAnalysis = state => state.selectedAnalysis;

export const stateSelectors = {
  getDashboard,
  ...shiftSelectors(getDashboard, dashboardStateSelectors),
  getSelectedAnalysis
};

export default reducer;
