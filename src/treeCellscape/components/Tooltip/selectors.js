import { createSelector } from "reselect";
import {
  getHighlightedElement,
  getHighlightedIndex,
  getHighlightedRange,
  getCellsIndexToID,
  getHighlightedTreeData,
  isClade,
  isCluster,
  isRow
} from "../selectors.js";

/**
 *
 */
const getHighlightedNodeText = createSelector(
  [
    getHighlightedElement,
    getHighlightedIndex,
    getHighlightedRange,
    getCellsIndexToID,
    getHighlightedTreeData
  ],
  (element, index, range, indexToID, nodeData) =>
    isClade(element)
      ? indexToID[index] +
        "\n" +
        "Children: " +
        nodeData["children"].length +
        "\n" +
        "Descendants: " +
        (range[1] - range[0])
      : ""
);

/**
 * Returns text - either cell ID (node and row) or # of descendents (clusters)
 */
export const getTooltipText = createSelector(
  [
    getHighlightedIndex,
    getHighlightedRange,
    getHighlightedElement,
    getCellsIndexToID,
    getHighlightedNodeText
  ],
  (index, range, element, indexToID, cladeText) =>
    isCluster(element)
      ? range[1] - range[0] + 1 + " descendents"
      : isClade(element) ? cladeText : indexToID[index] //isRow
);
