import { createSelector } from "reselect";

/**
 * State Selectors
 */

const getSegsData = state => state.data;
const getSegsPending = state => state.pending;

const segsDataStateSelectors = {};
const segsPendingStateSelectors = {};

export const stateSelectors = {
  segsDataSelector,
  segsPendingSelector,
  ...shiftSelectors(segsDataSelector, segsDataStateSelectors),
  ...shiftSelectors(segsPendingSelector, segsPendingStateSelectors)
};

/**
 * Reselectors
 */

/**
 *
 */
