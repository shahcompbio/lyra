import { combineReducers } from "redux";
import selected, {
  stateSelectors as selectedStateSelectors
} from "./selected/reducer.js";
import createReducer from "utils/createReducer.js";
import actions from "./types.js";
import shiftSelectors from "utils/shiftSelectors.js";

const initialAnalysis = [];
const analysis = createReducer(initialAnalysis)({
  [actions.fetchAllAnalysisSuccess]: (state, action) => [
    ...state,
    ...action.analysis
  ]
});

const reducer = combineReducers({
  analysis,
  selected
});

/**
 * State Selectors
 */

const getAnalysisList = state => state.analysis;
const getSelectedAnalysis = state => state.selected;

export const stateSelectors = {
  getAnalysisList,
  getSelectedAnalysis,
  ...shiftSelectors(getSelectedAnalysis, selectedStateSelectors)
};

export default reducer;
