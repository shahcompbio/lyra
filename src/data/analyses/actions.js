import types from "./types.js";

export const fetchAllAnalysis = () => ({
  type: types.fetchAllAnalysis
});

export const fetchAllAnalysisSuccess = analyses => ({
  type: types.fetchAllAnalysisSuccess,
  analyses
});

export const selectAnalysis = (analysisID, treeIndex, segsIndex) => ({
  type: types.selectAnalysis,
  analysisID,
  treeIndex,
  segsIndex
});
