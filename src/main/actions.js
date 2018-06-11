import types from "./types.js";

export const resetDashboard = () => ({
  type: types.resetDashboard
});

export const selectAnalysis = (analysis, dashboard) => ({
  type: types.selectAnalysis,
  analysis,
  dashboard
});
