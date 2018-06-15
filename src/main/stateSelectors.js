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
  getRoot,
  getRootPath,
  getRootRanges
} = stateSelectors;
