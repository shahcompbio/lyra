import { createSelector } from "reselect";

/**
 * Reselectors
 */

export const getMissingSegIDs = getSegsData =>
  createSelector([getSegsData, (state, ids) => ids], (segs, ids) =>
    ids.filter(id => !segs.hasOwnProperty(id))
  );
