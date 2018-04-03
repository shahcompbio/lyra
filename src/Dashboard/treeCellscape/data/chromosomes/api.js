import { fetchQuery } from "api/index.js";

/**
 * Fetch chromosome ranges from Elasticsearch
 * @public
 */
export function fetchChromRanges(segsIndex) {
  return fetchQuery(chromRangesQuery(), segsIndex).then(json =>
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
