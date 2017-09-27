
/*
Actions for config
*/

export const types = {

	// Fetch from server
	loadConfig: "LOAD_CONFIG",

	// Received from server
	receiveConfig: "RECEIVE_CONFIG"
}


// Load global configuration (part of saga) - involves fetching and receiving
export const loadConfig = (caller) => ({
	type: types.loadConfig,
	caller
})


// Received config from Elasticsearch (already preprocessed)
export const receiveConfig = (caller, data) => ({
	type: types.receiveConfig,
	caller,
	fields: data
})

