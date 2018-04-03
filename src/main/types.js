import analysisTypes from "./analyses/types.js";
import dashboardTypes from "./dashboards/types.js";

const types = {
  resetDashboard: "RESET_DASHBOARD",
  ...analysisTypes,
  ...dashboardTypes
};

export default types;
