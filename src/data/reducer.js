import { combineReducers } from "redux";

import cells, {
	stateSelectors as cellStateSelectors
} from "./cells/reducer.js";
import chromosomes, {
	stateSelectors as chromosomesStateSelectors
} from "./chromosomes/reducer.js";

import shiftSelectors from "state/reducers/utils/shiftSelectors.js";

const reducer = combineReducers({
	cells,
	chromosomes
});

const cellsSelector = state => state.cells;
const chromosomesSelector = state => state.chromosomes;

export const stateSelectors = {
	cellsSelector,
	chromosomesSelector,
	...shiftSelectors(cellsSelector, cellStateSelectors),
	...shiftSelectors(chromosomesSelector, chromosomesStateSelectors)
};

export default reducer;
