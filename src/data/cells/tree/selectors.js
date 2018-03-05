import { createSelector } from "reselect";
import { getTreeData } from "./stateSelectors.js";

/**
 * Reselectors
 */

/**
 * Factory function - gets tree record for specific cell ID
 */
export const makeGetTreeNodeRecordByID = () =>
  createSelector(
    [getTreeData, (state, id) => id],
    // (object, string) => object || null
    (nodes, id) => {
      return nodes[id];
    }
  );

/**
 * Factory function - Get shallow tree node records given list of IDs
 */
export const makeGetTreeNodeRecordsByID = () =>
  createSelector(
    [getTreeData, (state, ids) => ids],
    // (object, array) => array
    (nodes, ids) =>
      ids.map(nodeID => {
        const {
          heatmapIndex,
          maxHeight,
          cellID,
          minDescendantIndex,
          maxDescendantIndex
        } = nodes[nodeID];
        return {
          heatmapIndex,
          maxHeight,
          cellID,
          minDescendantIndex,
          maxDescendantIndex
        };
      })
  );
