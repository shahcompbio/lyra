import types from "./types.js";

export const selectDashboard = dashboard => ({
  type: types.selectDashboard,
  dashboard
});

export const fetchAllDashboard = () => ({
  type: types.fetchAllDashboard
});

export const fetchAllDashboardSuccess = dashboards => ({
  type: types.fetchAllDashboardSuccess,
  dashboards
});
