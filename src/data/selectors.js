import shiftSelectors from "utils/shiftSelectors.js";

import { stateSelectors as cellsStateSelectors } from "./cells/selectors.js";
import { stateSelectors as chromosomesStateSelectors } from "./chromosomes/selectors.js";

/**
 * State Selectors
 */

const getDataCells = state => state.cells;
const getDataChromosomes = state => state.chromosomes;

export const stateSelectors = {
  getDataCells,
  getDataChromosomes,
  ...shiftSelectors(getDataCells, cellStateSelectors),
  ...shiftSelectors(getDataChromosomes, chromosomesStateSelectors)
};

export * from "./cells/selectors.js";
export * from "./chromosomes/selectors.js";
