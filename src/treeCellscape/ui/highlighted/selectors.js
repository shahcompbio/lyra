import shiftSelectors from "utils/shiftSelectors.js";

/**
 * State Selectors
 */

const getHighlightedIndex = state => state.index;
const getHighlightedRange = state => state.range;

const uiHighlightedIndexStateSelectors = {};
const uiHighlightedRangeStateSelectors = {};

export const stateSelectors = {
  getHighlightedIndex,
  getHighlightedRange,
  ...shiftSelectors(getHighlightedIndex, uiHighlightedIndexStateSelectors),
  ...shiftSelectors(getHighlightedRange, uiHighlightedRangeStateSelectors)
};
