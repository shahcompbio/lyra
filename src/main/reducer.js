import treeCellscape from "treeCellscape/reducer.js";
import analysis, {
  stateSelectors as analysisStateSelectors
} from "browse/analysis/reducer.js";
import { combineReducers } from "redux";

import shiftSelectors from "utils/shiftSelectors.js";
import { stateSelectors as treeCellscapeStateSelectors } from "treeCellscape/reducer.js";

const reducer = combineReducers({
  treeCellscape,
  analysis
});

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
