import { types as actions } from '../actions/cells.js'
import createReducer from './createReducer.js'
import { combineReducers } from 'redux'


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


const allIDs = createReducer([])({
	[actions.receiveCells]: (state, action) => (
		Object.entries(action.cells).map((cell, index) => (cell[0]))
	)
})

const qc = createReducer({})({
	[actions.receiveCells]: (state, action) => (
		{ ... action.cells }
	)
})


const segs = createReducer({})({
	[actions.receiveCellSegments]: (state, action) => (
		{ ...state,
		  ...action.segs
		}
	)
})


const cells = combineReducers({
	allIDs: allIDs,
	qc: qc,
	segs
})






// General getters
export const getAllCellQC = (state) => (state.cells.qc)
export const getAllCellList = (state) => (state.cells.allIDs)


const hasSegData = (state, cellID) => (state.cells.segs.hasOwnProperty(cellID))
const getSegData = (state, cellID) => (state.cells.segs[cellID])



// Return filtered list of cells with no segment data
// !!! Should be using state to see if they have seg property
export const filterCellsNoSegments = (state, cells) => {
	return cells.filter((cell) => (!cell.hasOwnProperty("segs")))
}



// Given list of cell objects, return cells with segments (if has)
export const getCellSegments = (state, cells) => {
	return cells.map(cell => {
		return hasSegData(state, cell.id) ? 
				Object.assign({}, cell, {segs: getSegData(state, cell.id)}) :
				cell
	})
}






// Returns list of cells that contain given dimensions in view
// !!! probably a better way of writing that freaking sort function
export const getViewCells = (state, view, sortBy) => {
	let cells = getAllCellList(state)
	let data = getAllCellQC(state)

	let fields = getViewFields(view)

	let viewData = cells.filter(cell => hasViewData(cell, fields, data))
		 				  .map(cell => createViewCell(cell, fields, data))

	if (sortBy) {
		viewData = viewData.sort((a, b) => compareByField(a, b, sortBy))
	}

	return viewData

}

// Comparing function by cell attribute
// ASSUME: attr maps to numerical value
const compareByField = (cellA, cellB, attr) => (
	cellA[attr] < cellB[attr] ? -1 :
	cellA[attr] > cellB[attr] ? 1 :
								0

)


// Returns list of fields for the view
// !!! move somewhere else...
const getViewFields = (view) => (

	view.plot === "scatterplot" ? [view.x, view.y] :
	view.plot === "cellscape"   ? ["all_heatmap_order"] :
								  []
)


// Determines whether cell has given fields
// !!! Rewrite to have short circuiting effect
const hasViewData = (cell, fields, data) => {
	return fields.reduce((base, field) => {
		return base && data[cell].hasOwnProperty(field)
	}, true)
}






// Returns object for cell with given dimensions in view
// !!!! Generalize x, y to any arbitrary number of dimensions
const createViewCell = (cell, fields, data) => {
	return fields.reduce((obj, field) => {
		return {
			...obj,
			[field]: data[cell][field]
		}
	}, {
		id: cell
	})
}



export default cells