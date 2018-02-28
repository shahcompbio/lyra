import { stateSelectors } from "treeCellscape/reducer.js";

export const {
  getTreeRootID,
  getTreeData,
  getTreePending,
  getSegsData,
  getSegsPending,
  getCellsSegs,
  getCellsTree,
  getCellsIndexToID,
  getChromosomeData,
  getChromosomeOrder
} = stateSelectors;
