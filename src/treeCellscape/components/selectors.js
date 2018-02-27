import { createSelector } from "reselect";
import { treeConfig } from "../config.js";

import {
  getCurrTreeRootRecord,
  getHighlightedIndex,
  getHighlightedRange
} from "../ui/selectors.js";

import { getCellsIndexToID } from "data/selectors.js";

export {
  getCurrTreeRootID,
  getCurrTreeRootRecord,
  isCurrRootAtRoot,
  getHighlightedIndex,
  getHighlightedRange
} from "../ui/selectors.js";

export {
  getOrderedChromosomeData,
  getSegsData,
  getMissingSegIndices,
  makeGetTreeNodeRecordByID,
  makeGetTreeNodeRecordsByID,
  getCellsIndexToID
} from "data/selectors.js";

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
 * Returns text - either cell ID (node and row) or # of descendents (clusters)
 */
export const getHighlightedText = createSelector(
  [getHighlightedIndex, getHighlightedRange, getCellsIndexToID],
  (index, range, indexToID) =>
    isCluster(index, range)
      ? range[1] - range[0] + 1 + " descendents"
      : indexToID[index]
);

/**
 *	Factory function - determines whether given index is currently highlighted
 */
export const makeIsIndexHighlighted = () =>
  createSelector(
    [getHighlightedIndex, getHighlightedRange, (state, index) => index],
    (highlightedIndex, highlightedRange, index) =>
      isClade(highlightedIndex, highlightedRange)
        ? highlightedRange[0] <= index && index <= highlightedRange[1]
        : isCluster(highlightedIndex, highlightedRange)
          ? highlightedRange[0] <= index && index <= highlightedRange[1]
          : highlightedIndex === index
  );

/**
 *	Factory function - determines whether given index range is currently highlighted
 */
export const makeIsIndexRangeHighlighted = () =>
  createSelector(
    [
      getHighlightedIndex,
      getHighlightedRange,
      (state, minIndex, maxIndex) => [minIndex, maxIndex]
    ],
    (highlightedIndex, highlightedRange, indexRange) =>
      isClade(highlightedIndex, highlightedRange)
        ? highlightedRange[0] <= indexRange[0] &&
          highlightedRange[1] >= indexRange[1]
        : isCluster(highlightedIndex, highlightedRange)
          ? highlightedRange[0] === indexRange[0] &&
            highlightedRange[1] === indexRange[1]
          : indexRange[0] <= highlightedIndex &&
            highlightedIndex <= indexRange[1]
  );

/**
 * Determines whether clade has been highlighted
 * @param { null || int } index
 * @param { null || array } range
 */
const isClade = (index, range) => index !== null && range !== null;

/**
 * Determines whether cluster has been highlighted
 * @param { null || int } index
 * @param { null || array } range
 */
const isCluster = (index, range) => index === null && range !== null;
