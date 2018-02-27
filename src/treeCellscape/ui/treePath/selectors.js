import shiftSelectors from "utils/shiftSelectors.js";
import { createSelector } from "reselect";
import { getTreeData, getTreeRootID } from "data/selectors.js";

const getTreePath = state => state.treePath;

export const stateSelectors = {
  getTreePath
};
