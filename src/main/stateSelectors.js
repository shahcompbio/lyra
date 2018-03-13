import { stateSelectors } from "./reducer.js";

export const {
  getAnalysis,
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
