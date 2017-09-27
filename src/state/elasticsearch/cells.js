import { fetchQuery } from '../elasticsearch/index.js'

/*
	Elasticsearch library for cell related functionality
*/



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
		const newCell = processDataRecord(record.fields)

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
	return { [recordObj["cell_id"]]: recordObj }
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






