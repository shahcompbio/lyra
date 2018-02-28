import { fetchForDataType } from "api/index.js";

/**
 * Fetch chromosome ranges from Elasticsearch
 * @public
 */
export function fetchChromRanges() {
  return fetchForDataType(chromRangesQuery(), "segs").then(json =>
    parseChromRanges(json)
  );
}

// Fetch chromosome ranges (start and end)

/**
 * Query to get chromosome ranges
 */
export const chromRangesQuery = () => ({
  size: 0,
  aggs: {
    chrom_ranges: {
      terms: {
        field: "chrom_number",
        size: 50000,
        order: {
          _term: "asc"
        }
      },
      aggs: {
        XMax: {
          max: {
            field: "end"
          }
        },
        XMin: {
          min: {
            field: "start"
          }
        }
      }
    }
  },
  query: {
    bool: {
      filter: [
        {
          terms: {
            caller: ["single_cell_hmmcopy_seg"]
          }
        }
      ]
    }
  }
});

/**
 * Parse chromosome range query results
 */
export const parseChromRanges = json => {
  const chromBuckets = json.aggregations["chrom_ranges"].buckets;

  return chromBuckets.map(bucket => ({
    chrom: bucket.key,
    start: bucket.XMin.value,
    end: bucket.XMax.value
  }));
};
