import { combineReducers } from "redux";

import cells, {
	stateSelectors as cellStateSelectors
} from "./cells/reducer.js";

import shiftSelectors from "state/reducers/utils/shiftSelectors.js";

const reducer = combineReducers({
	cells
});

/**
 * montageApp selectors
 */

const cellsSelector = state => state.cells;

export const stateSelectors = {
	cellsSelector,
	...shiftSelectors(cellsSelector, cellStateSelectors)
};

export default reducer;
