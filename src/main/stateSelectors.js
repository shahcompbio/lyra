import { stateSelectors } from "./reducer.js";

export const {
  getAnalysisList,
  getSelectedAnalysis,
  getSelectedID,
  getTreeCellscape,
  getSegsData,
  getSegsPending,
  getTreePath,
  getTreeData,
  getTreeRootID,
  getCellsIndexToID,
  getChromosomeData,
  getChromosomeOrder,
  getHighlightedIndex,
  getHighlightedRange,
  getHighlightedElement,
  getSelectedSegsIndex,
  getSelectedTreeIndex
} = stateSelectors;