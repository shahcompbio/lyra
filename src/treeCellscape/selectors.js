import { stateSelectors } from "./reducer.js";

export * from "data/selectors.js";
export * from "./ui/selectors.js";

/**
 * State selectors
 */

export const {
  getSegsData,
  getTreePath,
  getTreeData,
  getTreeRootID,
  getCellsIndexToID,
  getChromosomeData,
  getChromosomeOrder,
  getHighlightedIndex,
  getHighlightedRange
} = stateSelectors;
