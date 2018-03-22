import { createSelector } from "reselect";
import { treeConfig } from "../config.js";

import {
  getCurrTreeRootRecord,
  getHighlightedIndex,
  getHighlightedRange,
  getHighlightedElement,
  getCellsIndexToID,
  getTreeData
} from "../selectors.js";

export {
  getCurrTreeRootID,
  getCurrTreeRootRecord,
  isCurrRootAtRoot,
  getHighlightedIndex,
  getHighlightedRange,
  getHighlightedElement,
  getOrderedChromosomeData,
  getChromosomeOrder,
  getTreeData,
  getSegsData,
  getMissingSegIDs,
  makeGetTreeNodeRecordByID,
  makeGetTreeNodeRecordsByID,
  getCellsIndexToID,
  getMissingIDMappings,
  getSelectedAnalysis
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

/**
 *	Factory function - determines whether given index is currently highlighted
 */
export const makeIsIndexHighlighted = () =>
  createSelector(
    [
      getHighlightedElement,
      getHighlightedIndex,
      getHighlightedRange,
      (state, index) => index
    ],
    (element, highlightedIndex, highlightedRange, index) =>
      isClade(element)
        ? highlightedRange[0] <= index && index <= highlightedRange[1]
        : isCluster(element)
          ? highlightedRange[0] <= index && index <= highlightedRange[1]
          : highlightedIndex === index
  );

/**
 *	Factory function - determines whether given index range is currently highlighted
 */
export const makeIsIndexRangeHighlighted = () =>
  createSelector(
    [
      getHighlightedElement,
      getHighlightedIndex,
      getHighlightedRange,
      (state, minIndex, maxIndex) => [minIndex, maxIndex]
    ],
    (element, highlightedIndex, highlightedRange, indexRange) =>
      isClade(element)
        ? highlightedRange[0] <= indexRange[0] &&
          highlightedRange[1] >= indexRange[1]
        : isCluster(element)
          ? false
          : indexRange[0] <= highlightedIndex &&
            highlightedIndex <= indexRange[1]
  );

export const getHighlightedTreeData = createSelector(
  [getTreeData, getHighlightedIndex, getCellsIndexToID],
  (treeData, index, indexToID) =>
    index !== null ? treeData[indexToID[index]] : null
);

/**
 * Determines whether clade/cluster/row has been highlighted
 */
export const isClade = element => element === "clade";
export const isCluster = element => element === "cluster";
export const isRow = element => element === "row";
