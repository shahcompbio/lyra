import shiftSelectors from "utils/shiftSelectors.js";

/**
 * State Selectors
 */

export const getHighlightedIndex = state => state.index;
export const getHighlightedRange = state => state.range;

const uiHighlightedIndexStateSelectors = {};
const uiHighlightedRangeStateSelectors = {};

export const stateSelectors = {
  getHighlightedIndex,
  getHighlightedRange,
  ...shiftSelectors(getHighlightedIndex, uiHighlightedIndexStateSelectors),
  ...shiftSelectors(getHighlightedRange, uiHighlightedRangeStateSelectors)
};
