import { call, select, put } from 'redux-saga/effects'
import { fetchCells } from '../elasticsearch/cells.js'
import { receiveCells } from '../actions/cells.js'
import { filterCategoricalFields, filterNumericalFields } from '../reducers/config.js'

/*
 Sagas for cells
*/


// Load cells 
// TODO: Will want to change so it will trigger on libraryID selection
export function* loadCellsSaga(libraryID, allFields, caller) {


	//const action = yield take(types.loadCells) // once you get config action

	const catFields = yield select(filterCategoricalFields, caller, allFields)
	const numFields = yield select(filterNumericalFields, caller, allFields)

	const { cells, fields } = yield call(fetchCells, libraryID, catFields, numFields) // fetch data

	yield put(receiveCells(cells, fields))

}


