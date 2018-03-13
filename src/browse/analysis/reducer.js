import { combineReducers } from "redux";
import createReducer from "utils/createReducer.js";
import actions from "./types.js";

const initialAnalysis = [];
const analysis = createReducer(initialAnalysis)({
  [actions.fetchAllAnalysisSuccess]: (state, action) => [
    ...state,
    ...action.analysis
  ]
});

export const stateSelectors = {};

export default analysis;
