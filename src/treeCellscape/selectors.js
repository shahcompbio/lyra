import { stateSelectors } from "./reducer.js";
import * as dataSelectors from "data/selectors.js";
import * as uiSelectors from "./ui/selectors.js";

/**
 * State selectors
 */

export const {
  getSegsData,
  getTreePath,
  getTreeData,
  getTreeRootID,
  getCellsIndexToID,
  getChromosomeData,
  getChromosomeOrder,
  getHighlightedIndex,
  getHighlightedRange
} = stateSelectors;

/**
 * Reselectors
 */

export const getMissingSegIDs = dataSelectors["getMissingSegIDs"](getSegsData);

export const makeGetTreeNodeRecordsByID = dataSelectors[
  "makeGetTreeNodeRecordsByID"
](getTreeData);

export const makeGetTreeNodeRecordByID = dataSelectors[
  "makeGetTreeNodeRecordByID"
](getTreeData);

export const getIDsByIndices = dataSelectors["getIDsByIndices"](
  getCellsIndexToID
);

export const getMissingIDMappings = dataSelectors["getMissingIDMappings"](
  getCellsIndexToID
);

export const getOrderedChromosomeData = dataSelectors[
  "getOrderedChromosomeData"
](getChromosomeOrder)(getChromosomeData);

export const getCurrTreeRootID = uiSelectors["getCurrTreeRootID"](getTreePath);

export const getCurrTreeRootRecord = uiSelectors["getCurrTreeRootRecord"](
  getTreeData
)(getCurrTreeRootID);

export const isCurrRootAtRoot = uiSelectors["isCurrRootAtRoot"](
  getCurrTreeRootID
)(getTreeRootID);
