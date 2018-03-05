import { stateSelectors } from "treeCellscape/reducer.js";

export const {
  getTreeRootID,
  getTreeData,
  getSegsData,
  getSegsPending,
  getCellsSegs,
  getCellsTree,
  getCellsIndexToID,
  getChromosomeData,
  getChromosomeOrder
} = stateSelectors;
