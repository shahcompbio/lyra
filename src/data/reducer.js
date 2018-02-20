import { combineReducers } from "redux";

import cells from "./cells/reducer.js";
import chromosomes from "./chromosomes/reducer.js";

const reducer = combineReducers({
  cells,
  chromosomes
});

export default reducer;
