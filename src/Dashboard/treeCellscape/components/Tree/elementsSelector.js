import { createSelector } from "reselect";

import { getIndicesPerPixel } from "../selectors.js";

import config from "./config.js";

const getTreeClusterMinDescendants = createSelector(
  [getIndicesPerPixel],
  indPerPx => Math.floor(indPerPx * config["clusterMinHeight"])
);

/**
 * Gets threshold index distance - the number of indices apart children have to be in order to be visible
 */
const getThresholdIndex = createSelector(
  [getIndicesPerPixel],
  // int => int
  indPerPx => {
    const thresholdIndex = indPerPx * config["thresholdMin"];
    return thresholdIndex <= 1 ? -1 : thresholdIndex;
  }
);

/**
 * 	Factory function - gets elements (nodes and clusters) of tree's (by cell ID) children
 */
export const makeGetTreeElementsByChildren = () => {
  return createSelector(
    [
      (state, children) => children,
      getThresholdIndex,
      getTreeClusterMinDescendants
    ],
    // (array, int) => array
    createTreeElementsForChildren
  );
};

/**
 * Create elements for children, based on whether distance between siblings is greater than threshold
 * @param {array} children
 * @param {int} thresholdIndex
 * @return {array} elements - list of clusters and nodes
 */
const createTreeElementsForChildren = (
  children,
  thresholdIndex,
  minClusterDescendants
) => {
  return createTreeElementsForChildrenFunc(
    [],
    initializeCluster(),
    thresholdIndex,
    minClusterDescendants,
    children
  );
};

const createTreeElementsForChildrenFunc = (
  elements,
  cluster,
  threshold,
  minDescendants,
  children
) => {
  if (children.length === 0) return [];
  if (children.length === 1) {
    return isClusterCreating(cluster)
      ? isNodeDescendantsExceedThreshold(children[0], threshold)
        ? [...elements, cluster, children[0]]
        : hasEnoughDescendants(
            mergeNodeToCluster(cluster, children[0]),
            minDescendants
          )
          ? [...elements, mergeNodeToCluster(cluster, children[0])]
          : elements
      : [...elements, children[0]];
  } else {
    const [child, ...restChildren] = children;
    return isClusterCreating(cluster)
      ? isNodeDescendantsExceedThreshold(child, threshold)
        ? createTreeElementsForChildrenFunc(
            [...elements, cluster, child],
            initializeCluster(),
            threshold,
            minDescendants,
            restChildren
          )
        : createTreeElementsForChildrenFunc(
            elements,
            mergeNodeToCluster(cluster, child),
            threshold,
            minDescendants,
            restChildren
          )
      : isNodeDescendantsExceedThreshold(child, threshold)
        ? createTreeElementsForChildrenFunc(
            [...elements, child],
            cluster,
            threshold,
            minDescendants,
            restChildren
          )
        : createTreeElementsForChildrenFunc(
            elements,
            startClusterDrawing(child),
            threshold,
            minDescendants,
            restChildren
          );
  }
};

/**
 * Determines whether number of descendants of node exceeds threshold index
 * @param {object} node
 * 	@param {int} node.maxIndex
 *   @param {int} node.minDescendantIndex
 * @param {int} threshold
 */
const isNodeDescendantsExceedThreshold = (node, threshold) =>
  node["maxIndex"] - node["index"] + 1 > threshold;

/**
 * Determines whether cluster has enough descendants to be drawn
 * @param {object} cluster
 * @param {int} minDescendants - threshold
 * @return {bool}
 */
const hasEnoughDescendants = (cluster, minDescendants) =>
  cluster["endIndex"] - cluster["startIndex"] + 1 >= minDescendants;

/**
 * clusterDimesions {object}
 * 	clusterDimensions.isCreating {bool} - whether cluster is currently being created
 * 	clusterDimensions.startIndex {int}
 *	clusterDimensions.endIndex {int}
 * 	clusterDimensions.maxHeight {int} - tallest branch so far
 */
const initializeCluster = () => ({
  isCreating: false
});

const isClusterCreating = clusterDimensions => clusterDimensions.isCreating;

const startClusterDrawing = currNode => ({
  isCreating: true,
  startIndex: currNode["index"],
  endIndex: currNode["maxIndex"],
  maxHeight: currNode["maxHeight"]
});

const mergeNodeToCluster = (clusterDimensions, currNode) => ({
  ...clusterDimensions,
  endIndex: currNode["maxIndex"],
  maxHeight: Math.max(clusterDimensions["maxHeight"], currNode["maxHeight"])
});
