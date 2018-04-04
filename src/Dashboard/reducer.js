import treeCellscapeReducer, {
  stateSelectors as treeCellscapeStateSelectors
} from "./treeCellscape/reducer.js";
import { combineReducers } from "redux";
import createReducer from "utils/createReducer.js";
import shiftSelectors from "utils/shiftSelectors.js";
import actions from "main/types.js";

const initialSelected = "";
const selected = createReducer(initialSelected)({
  [actions.selectDashboard]: (state, action) => action.dashboard
});

const reducer = combineReducers({
  selected,
  dashboard: treeCellscapeReducer
});

const getSelectedDashboard = state => state.selected;

export const stateSelectors = {
  getSelectedDashboard,
  ...shiftSelectors(state => state.dashboard, treeCellscapeStateSelectors)
};
export default reducer;
