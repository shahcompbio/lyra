import { combineReducers } from "redux";
import cells from "./cells/reducer.js";
import chromosomes from "./chromosomes/reducer.js";

import shiftSelectors from "utils/shiftSelectors.js";
import { stateSelectors as cellsStateSelectors } from "./cells/reducer.js";
import { stateSelectors as chromosomesStateSelectors } from "./chromosomes/reducer.js";

const reducer = combineReducers({
  cells,
  chromosomes
});

/**
 * State Selectors
 */

const getDataCells = state => state.cells;
const getDataChromosomes = state => state.chromosomes;

const localStateSelectors = {
  getDataCells,
  getDataChromosomes,
  ...shiftSelectors(getDataCells, cellsStateSelectors),
  ...shiftSelectors(getDataChromosomes, chromosomesStateSelectors)
};

export const stateSelectors = shiftSelectors(
  state => state.data,
  localStateSelectors
);

export default reducer;
