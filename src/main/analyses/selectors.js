import { createSelector } from "reselect";
import {
  getSelectedAnalysisID,
  getAnalysesOrder,
  getAnalysesData
} from "./localSelectors.js";

export const getAllAnalysis = createSelector(
  [getAnalysesOrder, getAnalysesData],
  (order, data) => order.map(id => data[id])
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
