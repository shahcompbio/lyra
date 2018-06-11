import { combineReducers } from "redux";
import highlighted, {
  stateSelectors as highlightedStateSelectors
} from "./highlighted/reducer.js";
import root, { stateSelectors as rootStateSelectors } from "./root/reducer.js";

import shiftSelectors from "utils/shiftSelectors.js";

const reducer = combineReducers({
  root,
  highlighted
});

/**
 * State Selectors
 */

const getRoot = state => state.root;
const getHighlighted = state => state.highlighted;

export const stateSelectors = {
  getRoot,
  ...shiftSelectors(getRoot, rootStateSelectors),
  getHighlighted,
  ...shiftSelectors(getHighlighted, highlightedStateSelectors)
};

export default reducer;
