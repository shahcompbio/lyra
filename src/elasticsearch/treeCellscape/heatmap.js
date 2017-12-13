/**
*	Queries and parsers related to the heatmap view in Tree Cellscape
*/


import { MAPPINGS } from 'config/treeCellscape.js'
import { processRecord } from './utils.js'

// Fetching IDs for heatmap indices

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



export const parseIndexToIDs = (json) => (
	json.hits.hits.map((record) => (processRecord(record['_source'], MAPPINGS)))
)








// Fetching segs by cell IDs

export const segsByIDsQuery = ids => (
	addByIDsFilter(segsByIDsBaseQuery(), ids)
)


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



const addByIDsFilter = (query, ids) => {
	let terms = { terms: {} }

	terms.terms["cell_id"] = ids

	query.query.bool.filter = [...query.query.bool.filter, terms]

	return query
}




export const parseCellSegs = json => {
	return json.hits.hits.map((record) => (processRecord(record['fields'], MAPPINGS)))
}
