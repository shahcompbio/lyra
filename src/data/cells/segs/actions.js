import types from "./types.js";

/**
 * Fetch segments given heatmap indices
 * @param {array} indices
 */
export const fetchSegs = indices => ({
	type: types.fetchSegs,
	indices
});

/**
 * Fetch segments is successful
 * @param {array} segs - all segment records
 * @param {array} indices
 * @param {array} ids - cellIDs (maps in order with indices)
 */
export const fetchSegsSuccess = (segs, indices, ids) => ({
	type: types.fetchSegsSuccess,
	segs,
	indices,
	ids
});
