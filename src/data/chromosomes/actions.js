import types from "./types.js";

/**
 * Fetch chromosome ranges (start and ends)
 */
export const fetchChromRanges = () => ({
	type: types.fetchChromRanges
});

/**
 * Fetch chromosome ranges is successful
 * @param {array} chromosomes
 */
export const fetchChromRangesSuccess = chromosomes => ({
	type: types.fetchChromRangesSuccess,
	chromosomes
});
