import types from "./types.js";

/**
 * Fetch Tree Root
 */
export const fetchTreeRoot = () => ({
  type: types.fetchTreeRoot
});

/**
 * Fetch tree root is successful
 * @param {object} treeRoot - tree root record
 */
export const fetchTreeRootSuccess = treeRoot => ({
  type: types.fetchTreeRootSuccess,
  root: treeRoot
});

/**
 * Fetch tree nodes for given cellIDs
 * @param {string} nodeID
 */
export const fetchTreeNode = nodeID => ({
  type: types.fetchTreeNode,
  nodeID
});

/**
 * Fetch tree nodes is successful
 * @param {array} treeNodes - all tree node records
 * @param {array} nodeIDs
 */
export const fetchTreeNodesSuccess = (treeNodes, nodeIDs) => ({
  type: types.fetchTreeNodesSuccess,
  treeNodes,
  nodeIDs
});

/**
 * Fetch all tree nodes
 */
export const fetchAllTreeNodes = () => ({
  type: types.fetchAllTreeNodes
});

/**
 * Fetch all tree nodes is successful
 */
export const fetchAllTreeNodesSuccess = treeNodes => ({
  type: types.fetchAllTreeNodesSuccess,
  treeNodes
});
