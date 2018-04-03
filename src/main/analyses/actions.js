import types from "./types.js";

export const fetchAllAnalysis = () => ({
  type: types.fetchAllAnalysis
});

export const fetchAllAnalysisSuccess = analyses => ({
  type: types.fetchAllAnalysisSuccess,
  analyses
});

export const selectAnalysis = analysis => ({
  type: types.selectAnalysis,
  id: analysis.id
});
