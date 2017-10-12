import { call, select, put, take } from 'redux-saga/effects'
import { fetchCells, fetchCellSegs, fetchChromRanges } from '../elasticsearch/cells.js'
import { receiveCells, receiveCellSegments } from '../actions/cells.js'
import { receiveChromRanges } from '../actions/views.js'
import { filterCategoricalFields, filterNumericalFields } from '../reducers/config.js'
import { filterCellsNoSegments } from '../reducers/cells.js'

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
	yield call(loadCellSegments, action.cells)
}



// TODO: Move into cellscape-centric... files. And cry a bit
export function* loadChromRanges(viewID) {
	const resp = yield call(fetchChromRanges)
	yield put(receiveChromRanges(resp, viewID))
}




// Checks if any cells need segment data fetched, then fetches missing ones
// !!! This currently assumes this is first fetch, so it also gets chrom range data. You may not need this
// if you need to fetch multiple times
export function* loadCellSegments(cells) {
	const missingCells = yield select(filterCellsNoSegments, cells)

	if (missingCells.length > 0) {
		const rawSeg = yield call(fetchCellSegs, missingCells)
		yield put(receiveCellSegments(rawSeg))
	}
}