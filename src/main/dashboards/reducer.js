import createReducer from "utils/createReducer.js";
import actions from "./types.js";

const initialDashboards = [];
const dashboards = createReducer(initialDashboards)({
  [actions.fetchAllDashboardSuccess]: (state, action) => action.dashboards
});

export default dashboards;
