import { stateSelectors } from "./reducer.js";

export const {
  // Analyses
  getSelectedAnalysis,

  // Dashboard
  getSelectedDashboard,
  getTreeCellscape,
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
