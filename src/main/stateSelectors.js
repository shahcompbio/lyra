import { stateSelectors } from "./reducer.js";

export const {
  // Analyses
  getSelectedAnalysis,

  // Dashboard
  getSelectedDashboard,
  getTreeCellscape,
  getHighlighted,
  getHighlightedIndex,
  getHighlightedRange,
  getHighlightedElement,
  getHighlightedData,
  getHighlightedSegment,
  getRoot,
  getRootPath,
  getRootRanges,

  getIsPloidyNormalized,
  getIsDiffsModeOn
} = stateSelectors;
