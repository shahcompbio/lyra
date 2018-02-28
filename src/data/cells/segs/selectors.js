import { createSelector } from "reselect";
import { getSegsData } from "../selectors.js";

export { getSegsData, getSegsPending } from "../selectors.js";

/**
 * Reselectors
 */

export const getMissingSegIDs = createSelector(
  [getSegsData, (state, ids) => ids],
  (segs, ids) => ids.filter(id => !segs.hasOwnProperty(id))
);
