import { combineReducers } from "redux";
import highlighted, {
  stateSelectors as highlightedStateSelectors
} from "./highlighted/reducer.js";
import root, { stateSelectors as rootStateSelectors } from "./root/reducer.js";
import menu, { stateSelectors as menuStateSelectors } from "./menu/reducer.js";

import shiftSelectors from "utils/shiftSelectors.js";

const reducer = combineReducers({
  root,
  highlighted,
  menu
});

/**
 * State Selectors
 */

const getRoot = state => state.root;
const getHighlighted = state => state.highlighted;
const getMenu = state => state.menu;

export const stateSelectors = {
  getRoot,
  ...shiftSelectors(getRoot, rootStateSelectors),
  getHighlighted,
  ...shiftSelectors(getHighlighted, highlightedStateSelectors),
  getMenu,
  ...shiftSelectors(getMenu, menuStateSelectors)
};

export default reducer;
