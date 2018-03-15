import treeCellscape from "treeCellscape/reducer.js";
import analysis, {
  stateSelectors as analysisStateSelectors
} from "./analysis/reducer.js";
import { combineReducers } from "redux";
import actions from "./types.js";

import shiftSelectors from "utils/shiftSelectors.js";
import { stateSelectors as treeCellscapeStateSelectors } from "treeCellscape/reducer.js";

const dashboardReducer = combineReducers({
  treeCellscape,
  analysis
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
const getAnalysis = state => state.analysis;

export const stateSelectors = {
  getTreeCellscape,
  ...shiftSelectors(getTreeCellscape, treeCellscapeStateSelectors),
  getAnalysis,
  ...shiftSelectors(getAnalysis, analysisStateSelectors)
};

export default reducer;
