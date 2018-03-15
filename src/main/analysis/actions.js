import types from "./types.js";
export * from "./selected/actions.js";

export const fetchAllAnalysis = () => ({
  type: types.fetchAllAnalysis
});

export const fetchAllAnalysisSuccess = analysis => ({
  type: types.fetchAllAnalysisSuccess,
  analysis
});
