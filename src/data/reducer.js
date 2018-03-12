import { combineReducers } from "redux";
import cells from "./cells/reducer.js";
import chromosomes from "./chromosomes/reducer.js";
import analysis from "./analysis/reducer.js";

import shiftSelectors from "utils/shiftSelectors.js";
import { stateSelectors as cellsStateSelectors } from "./cells/reducer.js";
import { stateSelectors as chromosomesStateSelectors } from "./chromosomes/reducer.js";
import { stateSelectors as analysisStateSelectors } from "./analysis/reducer.js";

const reducer = combineReducers({
  cells,
  chromosomes,
  analysis
});

/**
 * State Selectors
 */

const getDataCells = state => state.cells;
const getDataChromosomes = state => state.chromosomes;
const getDataAnalysis = state => state.analysis;

export const stateSelectors = {
  getDataCells,
  getDataChromosomes,
  getDataAnalysis,
  ...shiftSelectors(getDataCells, cellsStateSelectors),
  ...shiftSelectors(getDataChromosomes, chromosomesStateSelectors),
  ...shiftSelectors(getDataAnalysis, analysisStateSelectors)
};

export default reducer;
