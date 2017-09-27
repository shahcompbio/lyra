import { fetchCells } from '../elasticsearch/cells.js'
/*
	Actions for Cells
	TODO: When QC dashboard is abstracted, this may need to be moved, or generalized to 'data'

*/

export const types = {
	loadCells: "LOAD_CELLS", 
	receiveCells: "RECEIVE_CELLS"
}



// Action Creators

// Load cells (part of saga) - involves fetching and receiving
export const loadCells = (libraryID, fields) => ({
	type: types.loadCells,
	libraryID,
	fields
})


// Received cells from Elasticsearch (already preprocessed)
export const receiveCells = (cells, fields) => ({
	type: types.receiveCells,
	cells,
	fields
})
