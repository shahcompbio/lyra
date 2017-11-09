import { call, select, put, take, takeEvery } from 'redux-saga/effects'
import { fetchCells, fetchCellSegs, fetchChromRanges } from '../../elasticsearch/cells.js'
import { receiveCells, receiveCellSegments } from '../actions/cells.js'
import { receiveChromRanges } from '../actions/views.js'
import { filterCategoricalFields, filterNumericalFields } from '../reducers/config.js'

/*
 Sagas for cells
*/


// Load cells - involves fetching and receiving
// TODO: Will want to change so it will trigger on libraryID selection
export function* loadCellsSaga(libraryID, allFields, caller) {


	//const action = yield take(types.loadCells) // once you get config action

	const catFields = yield select(filterCategoricalFields, caller, allFields)
	const numFields = yield select(filterNumericalFields, caller, allFields)

	const { cells, fields } = yield call(fetchCells, libraryID, catFields, numFields) // fetch data

	yield put(receiveCells(cells, fields))

}




// Load initial Cellscape data -- chrom ranges and minimap cell segments 
export function* loadInitCellscape() {
	const action = yield take("LOAD_INIT_CELLSCAPE")
	yield call(loadChromRanges, action.viewID)
	//yield call(loadCellSegments, action.cells)
}



// TODO: Move into cellscape-centric... files. And cry a bit
export function* loadChromRanges(viewID) {
	const resp = yield call(fetchChromRanges)
	yield put(receiveChromRanges(resp, viewID))
}



export function* watchLoadCellSegments() {
	yield takeEvery("LOAD_MISSING_CELLS", loadCellSegments)
}



// fetches segments for all cells
export function* loadCellSegments(action) {
	const cells = action.cells.map(cell => (cell.id))
	const rawSeg = yield call(fetchCellSegs, cells)
	yield put(receiveCellSegments(rawSeg))
}