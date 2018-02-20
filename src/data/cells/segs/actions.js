import types from "./types.js";

/**
 * Fetch segments given heatmap indices
 * @param {array} ids
 */
export const fetchSegs = ids => ({
  type: types.fetchSegs,
  ids
});

/**
 * Fetch segments is successful
 * @param {array} segs - all segment records
 * @param {array} ids - cellIDs (maps in order with indices)
 */
export const fetchSegsSuccess = (segs, ids) => ({
  type: types.fetchSegsSuccess,
  segs,
  ids
});
