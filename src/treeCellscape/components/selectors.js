export {
  getCurrTreeRootID,
  getCurrTreeRootRecord as getTreeRootRecord,
  makeIsIndexHighlighted,
  makeIsIndexRangeHighlighted
} from "../ui/selectors.js";

export {
  getOrderedChromosomeData,
  getSegsByID,
  getMissingSegIndices,
  makeGetTreeNodeRecordByID
} from "data/selectors.js";

/**
 * Gets number of nodes contained in tree from root
 */
export const getTotalIndexNum = createSelector(
  [getTreeRootRecord],
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
