import data from "data/reducer.js";
import ui from "./ui/reducer.js";
import { combineReducers } from "redux";

import shiftSelectors from "utils/shiftSelectors.js";
import { stateSelectors as dataStateSelectors } from "data/reducer.js";
import { stateSelectors as uiStateSelectors } from "./ui/reducer.js";

const reducer = combineReducers({
  data,
  ui
});

/**
 * State Selectors
 */

const getData = state => state.data;
const getUI = state => state.ui;

export const stateSelectors = {
  getData,
  getUI,
  ...shiftSelectors(getData, dataStateSelectors),
  ...shiftSelectors(getUI, uiStateSelectors)
};

export default reducer;
