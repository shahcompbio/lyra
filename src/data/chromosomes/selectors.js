import { createSelector } from "reselect";
import shiftSelectors from "utils/shiftSelectors.js";

/**
 * State Selectors
 */

const getChromosomeData = state => state.data;
const getChromosomeOrder = state => state.order;

const chromosomesDataStateSelectors = {};
const chromosomesOrderStateSelectors = {};

export const stateSelectors = {
  getChromosomeData,
  getChromosomeOrder,
  ...shiftSelectors(getChromosomeData, chromosomesDataStateSelectors),
  ...shiftSelectors(getChromosomeOrder, chromosomesOrderStateSelectors)
};

/**
 * Gets chromosome range data in order
 */
export const getOrderedChromosomeData = createSelector(
  [getChromosomeOrder, getChromosomeData],
  // (array, object) => array
  (order, data) => order.map(chrom => data[chrom])
);
