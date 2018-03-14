import { stateSelectors } from "./reducer.js";

export const {
  getAnalysisList,
  getSelectedAnalysis,
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
  getHighlightedElement
} = stateSelectors;
