export * from "./segs/actions.js";
export * from "./tree/actions.js";

/**
 * Fetch index to cellID mappings is successful
 * @param {array} records
 */
export const fetchIndexToIDMappingsSuccess = records => ({
	type: types.fetchIndexToIDMappingsSuccess,
	records
});
