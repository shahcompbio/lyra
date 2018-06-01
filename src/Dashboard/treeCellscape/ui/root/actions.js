import types from "./types.js";

/**
 * Set tree root as nodeID
 * @param {string} nodeID
 * @param {int} totalNodes
 */
export const setTreeRoot = (nodeID, minIndex, maxIndex) => ({
  type: types.setTreeRoot,
  nodeID,
  minIndex,
  maxIndex
});

/**
 * Unset tree root, go back
 */
export const unsetTreeRoot = () => ({
  type: types.unsetTreeRoot
});
