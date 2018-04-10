/**
 * @param {JSON} record - record
 * @param {object} mapping
 * @return {object} processed record with mapped keys
 */
export const processRecord = (record, mapping) => {
  let processedRecord = {};

  for (let [key, value] of Object.entries(record)) {
    processedRecord = {
      ...processedRecord,
      [mapping[key]]: value
    };
  }
  return processedRecord;
};
