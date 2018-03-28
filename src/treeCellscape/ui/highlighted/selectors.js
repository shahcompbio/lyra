import { createSelector } from "reselect";
import {
  getHighlightedIndex,
  getHighlightedRange,
  getHighlightedElement
} from "./stateSelectors.js";

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

/**
 * Determines whether clade/cluster/row has been highlighted
 */
export const isClade = element => element === "clade";
export const isCluster = element => element === "cluster";
export const isRow = element => element === "row";
