import treeCellscapeReducer, {
  stateSelectors as treeCellscapeStateSelectors
} from "./treeCellscape/reducer.js";
import { combineReducers } from "redux";
import createReducer from "utils/createReducer.js";
import shiftSelectors from "utils/shiftSelectors.js";

import actions from "main/types.js";

/**
 * Selected dashboard
 */
export const initialSelected = null;
export const selected = createReducer(initialSelected)({
  [actions.selectAnalysis]: (state, action) => "TREE_CELLSCAPE"
});

/**
 * Dashboard reducers
 */

const dashboardReducer = combineReducers({
  selected,
  dashboard: treeCellscapeReducer
});

const defaultReducer = combineReducers({
  selected
});

/**
 * Main reducer / finite state machine
 */

const reducer = (state = { selected: initialSelected }, action) => {
  if (action.type === actions.resetDashboard) {
    state.dashboard = undefined;
  }

  switch (state.selected) {
    case "TREE_CELLSCAPE": {
      return dashboardReducer(state, action);
    }
    default: {
      return defaultReducer(state, action);
    }
  }
};

const getSelectedDashboard = state => state.selected;

export const stateSelectors = {
  getSelectedDashboard,
  ...shiftSelectors(state => state.dashboard, treeCellscapeStateSelectors)
};

export default reducer;
