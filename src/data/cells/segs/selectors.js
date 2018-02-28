import { createSelector } from "reselect";
import { getSegsData } from "./stateSelectors.js";

/**
 * Reselectors
 */

export const getMissingSegIDs = createSelector(
  [getSegsData, (state, ids) => ids],
  (segs, ids) => ids.filter(id => !segs.hasOwnProperty(id))
);
