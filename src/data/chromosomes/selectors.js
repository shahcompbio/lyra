import { createSelector } from "reselect";

/**
 * Gets chromosome range data in order
 */
export const getOrderedChromosomeData = getChromosomeOrder => getChromosomeData =>
  createSelector(
    [getChromosomeOrder, getChromosomeData],
    // (array, object) => array
    (order, data) => order.map(chrom => data[chrom])
  );
