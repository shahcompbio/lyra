import { stateSelectors } from "./reducer.js";

export const {
  // Analyses
  getSelectedAnalysisID,
  getAnalysesData,
  getAnalysesOrder,

  //Dashboards
  getDashboards,
  getSelectedDashboard,

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
