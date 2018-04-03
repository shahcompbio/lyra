import types from "./types.js";
export * from "./analyses/actions.js";
export * from "./dashboards/actions.js";

export const resetDashboard = () => ({
  type: types.resetDashboard
});
