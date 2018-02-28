import types from "./types.js";

export * from "./segs/actions.js";
export * from "./tree/actions.js";

/**
 *
 */
export const fetchIndexToIDMappings = indices => ({
  type: types.fetchIndexToIDMappings,
  indices
});

/**
 * Fetch index to cellID mappings is successful
 * @param {array} records
 */
export const fetchIndexToIDMappingsSuccess = records => ({
  type: types.fetchIndexToIDMappingsSuccess,
  records
});
