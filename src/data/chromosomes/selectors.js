import { createSelector } from "reselect";
import { getChromosomeData, getChromosomeOrder } from "./stateSelectors.js";

/**
 * Gets chromosome range data in order
 */
export const getOrderedChromosomeData = createSelector(
  [getChromosomeOrder, getChromosomeData],
  // (array, object) => array
  (order, data) => order.map(chrom => data[chrom])
);
