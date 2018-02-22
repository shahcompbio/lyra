import types from "./types.js";

/**
 * Set tree root as nodeID
 * @param {string} nodeID
 */
export const setTreeRoot = nodeID => ({
  type: types.setTreeRoot,
  nodeID
});

/**
 * Unset tree root, go back
 */
export const unsetTreeRoot = () => ({
  type: types.unsetTreeRoot
});
