import { createSelector } from "reselect";
import { treeConfig } from "../config.js";

import {
  getCurrTreeRootRecord,
  getCellsIndexToID,
  getHighlightedIndex,
  getTreeData
} from "../selectors.js";

// Tooltip
export {
  getHighlightedElement,
  getHighlightedIndex,
  getHighlightedRange,
  getCellsIndexToID,
  isClade,
  isCluster,
  isRow
} from "../selectors.js";

// Menu
// makeGetIDsByIndices, makeGetMissingIDMappings -> Heatmap
export {
  getSelectedAnalysis,
  isCurrRootAtRoot,
  getCurrTreeIndices
} from "../selectors.js";

// Tree
export {
  makeIsIndexRangeHighlighted,
  makeIsIndexHighlighted,
  getCurrTreeRootID,
  makeGetTreeNodeRecordByID,
  getTreeData,
  makeGetTreeNodeRecordsByID
} from "../selectors.js";

// Heatmap
// makeIsIndexHighlighted, -> Tree
export {
  getCurrTreeRootRecord,
  getOrderedChromosomeData,
  getChromosomeOrder,
  getSegsData,
  getMissingSegIDs,
  makeGetMissingIDMappings,
  makeGetIDsByIndices
} from "../selectors.js";

/**
 * Gets number of nodes contained in tree from root
 */
export const getTotalIndexNum = createSelector(
  [getCurrTreeRootRecord],
  // object => int
  treeRoot => treeRoot["maxDescendantIndex"] - treeRoot["heatmapIndex"] + 1
);

/**
 * Gets ratio of heatmap indices per pixel
 */
export const getIndicesPerPixel = createSelector(
  [getTotalIndexNum],
  // int => int
  numNodes => numNodes / treeConfig["height"]
);

export const getHighlightedTreeData = createSelector(
  [getTreeData, getHighlightedIndex, getCellsIndexToID],
  (treeData, index, indexToID) =>
    index !== null ? treeData[indexToID[index]] : null
);
