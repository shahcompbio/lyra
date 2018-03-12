import { combineReducers } from "redux";
import createReducer from "utils/createReducer.js";
import actions from "./types.js";

const initialAnalyses = [];
const analyses = createReducer(initialAnalyses)({
  [actions.fetchAllAnalysisSuccess]: (state, action) => [
    ...state,
    ...action.analyses
  ]
});
