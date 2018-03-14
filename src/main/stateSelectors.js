import { stateSelectors } from "./reducer.js";

export const {
  getAnalysisList,
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
