import { fetchQuery } from "api/index.js";
import { processRecord } from "api/utils.js";

const MAPPINGS = {
  cell_id: "cellID",
  start: "start",
  end: "end",
  chrom_number: "chromosome",
  state: "state",
  integer_median: "integerMedian"
};

/**
 * Fetch segment data from Elasticsearch, given cellIDs
 * @param {array} ids
 * @public
 */
export function fetchSegsByIDs(ids, index) {
  return fetchQuery(segsByIDsQuery(ids), index).then(json =>
    parseCellSegs(json)
  );
}

/**
 * Query for getting segment data by cellID
 */
const segsByIDsQuery = ids => addByIDsFilter(segsByIDsBaseQuery(), ids);

/**
 * Base query for fetching segment data
 */
const segsByIDsBaseQuery = () => ({
  size: 50000,
  _source: [
    "cell_id",
    "start",
    "end",
    "chrom_number",
    "state",
    "integer_median"
  ],
  query: {
    bool: {
      filter: []
    }
  }
});

/**
 * Add filter by cellID to query
 */
const addByIDsFilter = (query, ids) => {
  let terms = { terms: {} };

  terms.terms["cell_id"] = ids;

  query.query.bool.filter = [...query.query.bool.filter, terms];

  return query;
};

/**
 * Parse segment query results
 */
const parseCellSegs = json => {
  return json.hits.hits.map(record =>
    processRecord(record["_source"], MAPPINGS)
  );
};
