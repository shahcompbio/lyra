import { combineReducers } from "redux";
import highlighted, {
  stateSelectors as highlightedStateSelectors
} from "./highlighted/reducer.js";
import root, { stateSelectors as rootStateSelectors } from "./root/reducer.js";
import isPloidyNormalized from "./isPloidyNormalized/reducer.js";

import shiftSelectors from "utils/shiftSelectors.js";

const reducer = combineReducers({
  root,
  highlighted,
  isPloidyNormalized
});

/**
 * State Selectors
 */

const getRoot = state => state.root;
const getHighlighted = state => state.highlighted;
const getIsPloidyNormalized = state => state.isPloidyNormalized;

export const stateSelectors = {
  getRoot,
  ...shiftSelectors(getRoot, rootStateSelectors),
  getHighlighted,
  ...shiftSelectors(getHighlighted, highlightedStateSelectors),
  getIsPloidyNormalized
};

export default reducer;
