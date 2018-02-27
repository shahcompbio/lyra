import { createSelector } from "reselect";

/**
 * Reselectors
 */

/**
 * Factory function - gets tree record for specific cell ID
 */
export const makeGetTreeNodeRecordByID = getTreeData => () =>
  createSelector(
    [getTreeData, (state, id) => id],
    // (object, string) => object || null
    (nodes, id) => {
      const node = nodes[id];
      return isFullRecord(node) ? node : null;
    }
  );

/**
 * Determines whether record is full (has child attributes)
 * @param {object} node - record
 * @return {bool}
 */
const isFullRecord = node =>
  node !== undefined && node.hasOwnProperty("children");

/**
 * Factory function - Get shallow tree node records given list of IDs
 */
export const makeGetTreeNodeRecordsByID = getTreeData => () =>
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
