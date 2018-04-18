import { createSelector } from "reselect";
import {
  getSelectedAnalysisDashboard,
  getSelectedAnalysisID,
  getAnalysesOrder,
  getAnalysesData,
  getDashboards
} from "./localSelectors.js";

export const getAllAnalysis = createSelector(
  [getAnalysesOrder, getAnalysesData, getDashboards],
  (order, data, dashboards) =>
    dashboards.map(dashboard =>
      order.filter(id => data[id].dashboard === dashboard).map(id => data[id])
    )
);

export const getSelectedSegsIndex = createSelector(
  [getSelectedAnalysisID, getAnalysesData],
  (selectedID, analyses) =>
    selectedID === null ? null : analyses[selectedID]["segsIndex"]
);

export const getSelectedTreeIndex = createSelector(
  [getSelectedAnalysisID, getAnalysesData],
  (selectedID, analyses) =>
    selectedID === null ? null : analyses[selectedID]["treeIndex"]
);

export const getSelectedTitle = createSelector(
  [getSelectedAnalysisID, getAnalysesData],
  (selectedID, analyses) =>
    selectedID === null ? null : analyses[selectedID]["title"]
);
