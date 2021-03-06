import { createSelector } from "reselect";
import { treeConfig } from "../config.js";

import { getCurrRootTotalNodes } from "../selectors.js";

// Tooltip
export {
  getHighlightedElement,
  getHighlightedIndex,
  getHighlightedRange,
  getHighlightedData,
  getHighlightedSegment,
  isClade,
  isCluster,
  isRow
} from "../selectors.js";

// Menu
// makeGetIDsByIndices, makeGetMissingIDMappings -> Heatmap
export {
  getSelectedAnalysis,
  getSelectedDashboard,
  isCurrRootAtRoot,
  getIsPloidyNormalized,
  getIsDiffsModeOn
} from "../selectors.js";

// Tree
export {
  makeIsIndexRangeHighlighted,
  makeIsIndexHighlighted,
  getCurrRootID,
  getCurrRootRange
} from "../selectors.js";

// Heatmap
// makeIsIndexHighlighted, -> Tree
export { getCurrRootIndex } from "../selectors.js";

export { getCurrRootTotalNodes } from "../selectors.js";

/**
 * Gets ratio of heatmap indices per pixel
 */
export const getIndicesPerPixel = createSelector(
  [getCurrRootTotalNodes],
  // int => int
  numNodes => numNodes / treeConfig["height"]
);
