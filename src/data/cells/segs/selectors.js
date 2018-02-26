import { createSelector } from "reselect";
import shiftSelectors from "utils/shiftSelectors.js";

/**
 * State Selectors
 */

export const getSegsData = state => state.data;
export const getSegsPending = state => state.pending;

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
export const getMissingSegIDs = createSelector(
  [getSegsData, (state, ids) => ids],
  (segs, ids) => ids.filter(id => !segs.hasOwnProperty(id))
);
