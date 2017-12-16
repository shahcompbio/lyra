/**
*	Queries and parsers related to the heatmap view in Tree Cellscape
*/


import { MAPPINGS } from 'config/treeCellscape.js'
import { processRecord } from './utils.js'

// Fetching IDs for heatmap indices

/**
* Query for getting records given heatmap indices
*/
export const indexToIDQuery = (indices) => ({
	"size": 50000,
	"query": {
		"bool": {
			"filter": {
				"terms": {
					"heatmap_order": indices
				}
			}
		}
	}
})


/**
* Parse query result from index to ID query
*/
export const parseIndexToIDs = (json) => (
	json.hits.hits.map((record) => (processRecord(record['_source'], MAPPINGS)))
)








// Fetching segs by cell IDs

/**
* Query for getting segment data by cellID
*/
export const segsByIDsQuery = ids => (
	addByIDsFilter(segsByIDsBaseQuery(), ids)
)


/**
* Base query for fetching segment data
*/
const segsByIDsBaseQuery = () => ({
	"size": 50000,
	"fields": [
		"cell_id",
		"start",
		"end",
		"chrom_number",
		"state",
		"integer_median"
	],
	"query": {
		"bool": {
			"filter": [
				{
				"terms": {
					"caller": [
						"single_cell_hmmcopy_seg"
						]
					}
				}
			]
		}
	}
})


/**
* Add filter by cellID to query
*/
const addByIDsFilter = (query, ids) => {
	let terms = { terms: {} }

	terms.terms["cell_id"] = ids

	query.query.bool.filter = [...query.query.bool.filter, terms]

	return query
}



/**
* Parse segment query results
*/
export const parseCellSegs = json => {
	return json.hits.hits.map((record) => (processRecord(record['fields'], MAPPINGS)))
}





// Fetch chromosome ranges (start and end)


/**
* Query to get chromosome ranges
*/
export const chromRangesQuery = () => ({
	"size": 0,
	"aggs": {
		"chrom_ranges": {
			"terms": {
				"field": "chrom_number",
				"size": 50000,
				"order": {
					"_term": "asc"
				}
			},
			"aggs": {
				"XMax": {
					"max": {
						"field": "end"
					}
				},
				"XMin": {
					"min": {
						"field": "start"
					}
				}
			}
		}
	},
	"query": {
		"bool": {
			"filter": [
				{
				"terms": {
					"caller": [
						"single_cell_hmmcopy_seg"
						]
					}
				}
			]
		}
	}
})


/**
* Parse chromosome range query results
*/
export const parseChromRanges = json => {
	const chromBuckets = json.aggregations["chrom_ranges"].buckets

	return chromBuckets.map(bucket => ({
		chrom: bucket.key,
		start: bucket.XMin.value,
		end: bucket.XMax.value
	}))
}
