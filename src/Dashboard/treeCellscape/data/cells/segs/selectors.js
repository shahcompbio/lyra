import { createSelector } from "reselect";
import { getSegsData } from "./localSelectors.js";

/**
 * Reselectors
 */

export const getMissingSegIDs = createSelector(
  [getSegsData, (state, ids) => ids],
  (segs, ids) => ids.filter(id => !segs.hasOwnProperty(id))
);

export const getSegsByID = createSelector(
  [getSegsData, (state, ids) => ids],
  (segs, ids) => ids.filter(id => segs.hasOwnProperty(id)).map(id => segs[id])
);
