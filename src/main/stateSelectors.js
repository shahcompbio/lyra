import { stateSelectors } from "./reducer.js";

export const {
  // Analysis
  getAnalysisList,
  getSelectedAnalysis,
  getSelectedID,
  getSelectedSegsIndex,
  getSelectedTreeIndex,
  // Dashboard
  getTreeCellscape,
  getSegsData,
  getSegsPending,
  getTreePath,
  getTreeData,
  getTreePending,
  getTreeRootID,
  getCellsIndexToID,
  getChromosomeData,
  getChromosomeOrder,
  getHighlightedIndex,
  getHighlightedRange,
  getHighlightedElement
} = stateSelectors;
