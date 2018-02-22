import shiftSelectors from "utils/shiftSelectors.js";

import { stateSelectors as highlightedStateSelectors } from "./highlighted/selectors.js";

const getTreePath = state => state.treePath;
const getHighlighted = state => state.highlighted;

export const stateSelectors = {
  getTreePath,
  getHighlighted,
  ...shiftSelectors(getHighlighted, highlightedStateSelectors)
};

export * from "./highlighted/selectors.js";
export * from "./treePath/selectors.js";
