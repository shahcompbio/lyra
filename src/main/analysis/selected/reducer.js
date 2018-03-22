import { combineReducers } from "redux";
import createReducer from "utils/createReducer.js";
import actions from "./types.js";

const initialID = null;
const id = createReducer(initialID)({
  [actions.selectAnalysis]: (state, action) => action.id
});

const initialTitle = null;
const title = createReducer(initialTitle)({
  [actions.selectAnalysis]: (state, action) => action.title
});

const initialTreeIndex = null;
const treeIndex = createReducer(initialTreeIndex)({
  [actions.selectAnalysis]: (state, action) => action.treeIndex
});

const initialSegsIndex = null;
const segsIndex = createReducer(initialSegsIndex)({
  [actions.selectAnalysis]: (state, action) => action.segsIndex
});

const reducer = combineReducers({
  id,
  title,
  treeIndex,
  segsIndex
});

/**
 * State Selectors
 */

const getSelectedID = state => state.id;
const getSelectedTitle = state => state.title;
const getSelectedTreeIndex = state => state.treeIndex;
const getSelectedSegsIndex = state => state.segsIndex;

export const stateSelectors = {
  getSelectedID,
  getSelectedTitle,
  getSelectedTreeIndex,
  getSelectedSegsIndex
};

export default reducer;
