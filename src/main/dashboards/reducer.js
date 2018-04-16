import createReducer from "utils/createReducer.js";
import actions from "../analyses/types.js";

const initialDashboards = [];
const dashboards = createReducer(initialDashboards)({
  [actions.fetchAllAnalysisSuccess]: (state, action) =>
    action.analyses.reduce(
      (uniqueDashboards, analysis) =>
        uniqueDashboards.indexOf(analysis.dashboard) === -1
          ? [...uniqueDashboards, analysis.dashboard]
          : uniqueDashboards,
      [...state]
    )
});

export default dashboards;
