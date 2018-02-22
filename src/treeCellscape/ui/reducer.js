import actions from "./types.js";
import { combineReducers } from "redux";

import treePath from "./treePath/reducer.js";
import highlighted from "./highlighted/reducer.js";

const reducer = combineReducers({
  treePath,
  highlighted
});

export default reducer;
