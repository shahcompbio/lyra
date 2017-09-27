
/*
Actions for config
*/

export const types = {

	// Fetch from server
	loadConfig: "LOAD_CONFIG",

	// Received from server
	receiveConfig: "RECEIVE_CONFIG"
}



export const loadConfig = (caller) => ({
	type: types.loadConfig,
	caller
})



export const receiveConfig = (caller, data) => ({
	type: types.receiveConfig,
	caller,
	fields: data
})

