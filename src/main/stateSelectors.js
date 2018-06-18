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
  getHighlightedChromosome,
  getHighlightedID,
  getRoot,
  getRootPath,
  getRootRanges
} = stateSelectors;
