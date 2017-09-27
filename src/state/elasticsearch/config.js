/*
	Elasticsearch library for config related functionality
*/
import { fetchQuery } from '../elasticsearch/index.js'


// Fetch config
export function fetchConfig(caller) {
	return fetchQuery(configureFieldsQuery(caller)
		).then(json => parseConfig(json.hits.hits))
}

// Query for config
const configureFieldsQuery = (caller) => ({
	size: 100,
	fields: ["*"],
	"query": {
		"filtered": {
			"filter": {
				"terms": {
					"caller": [caller]
				}
			}
		}
	}
})



// Parsing config (to redux state)
const parseConfig = (records) => {
	const allFields = records.reduce((object, record) => {
		return parseColumnObjectFields(object, record.fields)
	}, {})
	return allFields
}

const parseColumnObjectFields = (object, fields) => {
	let newObject = { ...object }
	for (let [key, value] of Object.entries(fields)) {
		const newFieldConfig = getDefaultColumnConfig(key, value)
		newObject = { ...newObject, ...newFieldConfig }
	}

	return newObject
}

const getDefaultColumnConfig = (key, value) => {
	let config = {}
	config[key] = {
		name: key.replace(/[\.|_]/g, ' ').replace(/^./, key[0].toUpperCase()),
		id: key.replace(/\./g, '_'),
		type: typeof(value[0])
	}
	return config
}
