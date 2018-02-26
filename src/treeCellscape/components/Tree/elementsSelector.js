import {
  makeGetTreeNodeRecordsByID,
  getThresholdIndex,
  getIndicesPerPixel
} from "../selectors.js";

import config from "./config.js";

const getTreeClusterMinDescendants = createSelector(
  [getIndicesPerPixel],
  indPerPx => Math.floor(indPerPx * config["clusterMinHeight"])
);

/**
 * 	Factory function - gets elements (nodes and clusters) of tree's (by cell ID) children
 */
export const makeGetTreeElementsByChildren = () => {
  const getTreeNodeRecordsByID = makeGetTreeNodeRecordsByID();
  return createSelector(
    [getTreeNodeRecordsByID, getThresholdIndex, getTreeClusterMinDescendants],
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
  let clusterDimensions = initializeCluster();
  let i = 0;

  let elements = [];
  while (i < children.length) {
    const currNode = children[i];

    if (isClusterCreating(clusterDimensions)) {
      if (isNodeDescendantsExceedThreshold(currNode, thresholdIndex)) {
        elements = [...elements, { ...clusterDimensions }];
        clusterDimensions = initializeCluster();
        elements = [...elements, { ...currNode }];
      } else if (isLastNode(i, children)) {
        clusterDimensions = mergeNodeToCluster(clusterDimensions, currNode);

        elements = hasEnoughDescendants(
          clusterDimensions,
          minClusterDescendants
        )
          ? [...elements, { ...clusterDimensions }]
          : elements;
        clusterDimensions = initializeCluster();
      } else {
        clusterDimensions = mergeNodeToCluster(clusterDimensions, currNode);
      }
    } else {
      if (isNodeDescendantsExceedThreshold(currNode, thresholdIndex)) {
        elements = [...elements, { ...currNode }];
      } else if (isLastNode(i, children)) {
        elements = [...elements, { ...currNode }];
      } else if (
        isNodeDescendantsExceedThreshold(children[i + 1], thresholdIndex)
      ) {
      } else {
        clusterDimensions = startClusterDrawing(currNode);
      }
    }

    i++;
  }

  return elements;
};

/**
 * Determines whether number of descendants of node exceeds threshold index
 * @param {object} node
 * 	@param {int} node.maxDescendantIndex
 *   @param {int} node.minDescendantIndex
 * @param {int} threshold
 */
const isNodeDescendantsExceedThreshold = (node, threshold) =>
  node["maxDescendantIndex"] - node["minDescendantIndex"] + 1 > threshold;

/**
 * Determines whether current index is at last node
 * @param {int} i - current index
 * @param {array} children
 * @return {bool}
 */
const isLastNode = (i, children) => i + 1 >= children.length;

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
  startIndex: currNode["minDescendantIndex"],
  endIndex: currNode["maxDescendantIndex"],
  maxHeight: currNode["maxHeight"]
});

const mergeNodeToCluster = (clusterDimensions, currNode) => ({
  ...clusterDimensions,
  endIndex: currNode["maxDescendantIndex"],
  maxHeight: Math.max(clusterDimensions["maxHeight"], currNode["maxHeight"])
});
