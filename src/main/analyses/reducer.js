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

const initialSelectedID = null;
const selectedID = createReducer(initialSelectedID)({
  [actions.selectAnalysis]: (state, action) => action.id
});

const reducer = combineReducers({
  selectedID,
  data,
  order
});

/**
 * State Selectors
 */

const getSelectedAnalysisID = state => state.selectedID;
const getAnalysesOrder = state => state.order;
const getAnalysesData = state => state.data;

export const stateSelectors = {
  getSelectedAnalysisID,
  getAnalysesOrder,
  getAnalysesData
};

export default reducer;
