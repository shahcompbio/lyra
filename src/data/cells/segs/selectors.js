import { createSelector } from "reselect";
import shiftSelectors from "utils/shiftSelectors.js";

/**
 * State Selectors
 */

const getSegsData = state => state.data;
const getSegsPending = state => state.pending;

const segsDataStateSelectors = {};
const segsPendingStateSelectors = {};

export const stateSelectors = {
  getSegsData,
  getSegsPending,
  ...shiftSelectors(getSegsData, segsDataStateSelectors),
  ...shiftSelectors(getSegsPending, segsPendingStateSelectors)
};

/**
 * Reselectors
 */

/**
 *
 */
export const getSegsByID = createSelector(
  [getSegsData, (state, ids) => ids],
  (segs, ids) =>
    ids
      .filter(id => segs.hasOwnProperty(id))
      .map(id => createSegmentsRecord(segs[id], id))
);

/**
 * Creates record given segment data and heatmap index
 * @param {array} seg
 * @param {string} id
 * @return {object}
 */
const createSegment = (segs, cellID) => ({
  cellID,
  segs
});

/**
 *
 */
export const getMissingSegIDs = createSelector(
  [getSegsData, (state, ids) => ids],
  (segs, ids) => ids.filter(id => !segs.hasOwnProperty(id))
);
