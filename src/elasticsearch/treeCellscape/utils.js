
import { MAPPINGS } from 'config/treeCellscape.js'

/**
* @param {JSON} record - record
* @return {object} processed record with mapped keys
*/
export const processRecord = (record, mapping) => {
	let processedRecord = {}

	for (let [key, value] of Object.entries(record)) {
		processedRecord = {
			...processedRecord,
			[mapping[key]]: isSingleArrayValue(value) ? value[0] : value
		}
	}
	return processedRecord
}



const isSingleArrayValue = (value) => (
	Array.isArray(value) && value.length === 1
)