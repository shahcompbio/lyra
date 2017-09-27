import { types as actions } from '../actions/cells.js'
import createReducer from './createReducer.js'


/*

Cells: Object {
	
	allIDs: Array[<String>]
	data: Object<Cell>

	where Cell is:

	Object {
		id: <String>
		... all dimensions (to be determined by dashboard configuration file)
	}

}

*/



const initialState = {}

const cells = createReducer(initialState)({
	[actions.receiveCells]: (state, action) => (
		Object.assign({}, action.cells)
	)
})


// General getters
export const getAllCellData = (state) => (state.cells.data)
export const getAllCellList = (state) => (state.cells.allIDs)




// Returns list of cells that contain given dimensions in view
export const getViewCells = (state, view) => {
	let cells = getAllCellList(state)
	let data = getAllCellData(state)

	return cells.filter(cell => hasViewData(cell, view, data))
		 .map(cell => createViewCell(cell, view, data))

}


// Determines whether cell has given dimensions in view
// !!!! Generalize x, y to any arbitrary number of dimensions
const hasViewData = (cell, view, data) => {
	return data[cell].hasOwnProperty(view["x"]) && data[cell].hasOwnProperty(view["y"])
}


// Returns object for cell with given dimensions in view
// !!!! Generalize x, y to any arbitrary number of dimensions
const createViewCell = (cell, view, data) => {
	let xData = data[cell][view.x]
	let yData = data[cell][view.y]
	return Object.assign({},
		{
			id: cell,
			x: xData,
			y: yData
		}
	)

}

export default cells