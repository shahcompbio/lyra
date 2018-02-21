import { fetchForDataType } from "/api/index.js";
import { processRecord } from "/api/utils.js";
import { MAPPINGS } from "./tree/api.js";

/**
 * Fetch cellIDs from Elasticsearch, given heatmap indices
 * @param {array} indices
 * @public
 */
export function fetchIDsByIndices(indices) {
  return fetchForDataType(indexToIDQuery(indices), "tree").then(json =>
    parseIndexToIDs(json)
  );
}

/**
 * Query for getting records given heatmap indices
 */
const indexToIDQuery = indices => ({
  size: 50000,
  query: {
    bool: {
      filter: {
        terms: {
          heatmap_order: indices
        }
      }
    }
  }
});

/**
 * Parse query result from index to ID query
 */
const parseIndexToIDs = json =>
  json.hits.hits.map(record =>
    processRecord(record["_source"], MAPPINGS, false)
  );
