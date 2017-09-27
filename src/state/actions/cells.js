import { fetchCells } from '../elasticsearch/cells.js'
/*
	Actions for Cells
	TODO: When QC dashboard is abstracted, this may need to be moved, or generalized to 'data'

*/

export const types = {
	loadCells: "LOAD_CELLS", 
	receiveCells: "RECEIVE_CELLS"
}


export const loadCells = (libraryID, fields) => ({
	type: types.loadCells,
	libraryID,
	fields
})



export const receiveCells = (cells, fields) => ({
	type: types.receiveCells,
	cells,
	fields
})

