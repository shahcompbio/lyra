import { fetchQuery } from '../elasticsearch/index.js'

/*
	Elasticsearch library for cell related functionality
*/



// Fetch chrom range from ElasticSearch
// !!! Eventually will need to take in list of facades
export function fetchChromRanges() {
	return fetchQuery(chromRangesQuery())
				.then(json => parseChromRanges(json))
}




const chromRangesQuery = () => ({
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


const parseChromRanges = json => {
	const chromBuckets = json.aggregations["chrom_ranges"].buckets

	return chromBuckets.map(bucket => ({
		chrom: bucket.key,
		start: bucket.XMin.value,
		end: bucket.XMax.value
	}))
}



// Fetch cell segments from Elasticsearch
export function fetchCellSegs(cells) {
	return fetchQuery(cellSegQuery(cells))
					.then(json => parseCellSegs(json))
}




const cellSegQuery = cells => (
	addQueryCellFilter(cellSegBaseQuery(), cells)
)


const cellSegBaseQuery = () => ({
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



const addQueryCellFilter = (query, cells) => {
	let terms = { terms: {} }

	terms.terms["cell_id"] = cells

	query.query.bool.filter = [...query.query.bool.filter, terms]

	return query


}

const parseCellSegs = json => {
	const segData = parseSegs(json.hits.hits)
	return segData
}


const parseSegs = (records) => {
	return records.reduce((cellMap, record) => {
		// process record
		const segment = processDataRecord(record.fields);
		// put in appropriate place in cellMap
		const allCellSegs = 
			cellMap.hasOwnProperty(segment.cell_id) ? [...cellMap[segment.cell_id], segment]
													 : [segment]

		const newMap = Object.assign({}, cellMap, {
			[segment.cell_id]: allCellSegs
		})

		return newMap
	}, {})
}


// Fetch cells from Elasticsearch, given libraryID and fields needed
export function fetchCells(libraryID, catFields, numFields) {
	return fetchQuery(sampleDataQuery(catFields, numFields)
		).then(json => parseCellsData(json))
}



// Query for fetching cell data and field data
const sampleDataQuery = (catFields, numFields) => ({
	size: 50000,
	fields: [ ...catFields, ...numFields, "cell_id"],
	aggs: createFieldAggregations(catFields, numFields),
	"query": {
		"filtered": {
			"filter": {
				"terms": {
					"caller": ["single_cell_qc"]
				}
			}
		}
	}
})

// Create aggregation query for fields
const createFieldAggregations = (catFields, numFields) => {
	return Object.assign(
		convertToAggs(catFields, getCategoricalAgg),
		convertToAggs(numFields, getNumericalAgg)
	)
}

// Create aggregation query for given fields, given function
const convertToAggs = (fields, aggFunc) => {
	return fields.reduce((object, field) => {
		return Object.assign(object, { [field]: aggFunc(field) })
	}, {})
}

// Returns aggregation query for numerical field
const getNumericalAgg = (field) => {
	return {
		"stats": {
			"field": field
		}
	}
}

// Returns aggregation query for categorical field
const getCategoricalAgg = (field) => {
	return {
		"terms": {
			"size": 10000,
			"field": field,
			"order": {
				"_term": "asc"
			}
		}
	}
}


// Process json for cell and field data
const parseCellsData = (json) => ({
	cells: parseDataRecords(json.hits.hits),
	fields: parseDataFields(json.aggregations)
})


// Parsing Data Records into cell (as per redux state)
// TODO: Process just data records? Reducer can extract any needed metadata
const parseDataRecords = (records) => {
	const cells = records.reduce((object, record) => {
		const processedRecord = processDataRecord(record.fields)
		const newCell = { [processedRecord["cell_id"]]: processedRecord }

		return {	...object,
					...newCell
		}	
	}, {})

	const cellIDs = Object.entries(cells).map(
		(cell, index) => (cell[0])
	)
	return { data: cells, allIDs: cellIDs }
}

// Process one data record
const processDataRecord = (record) => {
	let recordObj = {}
	for (let [key, value] of Object.entries(record)) {
		recordObj[key] = value[0]
	}
	return recordObj
}


// Parsing Data Field Aggregations (as per redux state)

const parseDataFields = (aggregations) => {
	let fields = {}
	for (let [key, value] of Object.entries(aggregations)) {
		const newField = {
			[key]: value.hasOwnProperty("buckets") ? processCategoricalAgg(value.buckets) : value 
		}
		fields = { ...fields, ...newField }
	}
	return fields
}


const processCategoricalAgg = (buckets) => {
	return buckets.map((bucket) => {
		return {
			id: bucket.key,
			count: bucket.doc_count
		}
	})
}






