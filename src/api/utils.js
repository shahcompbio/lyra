
/**
* @param {JSON} record - record
* @param {object} mapping
* @param {bool} isField - whether query was a field query or not
* @return {object} processed record with mapped keys
*/
export const processRecord = (record, mapping, isField) => {
	let processedRecord = {}

	for (let [key, value] of Object.entries(record)) {
		processedRecord = {
			...processedRecord,
			[mapping[key]]: isField ? value[0] : value
		}
	}
	return processedRecord
}