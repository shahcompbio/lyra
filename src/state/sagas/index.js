import { fork, all } from 'redux-saga/effects'

import { treeCellscapeSagas } from './treeSagas.js'
//import { loadConfigSaga } from './configSagas'
//import { loadCellsSaga, loadInitCellscape, watchLoadCellSegments } from './cellSagas'

/*

Main sagas

*/

export function* rootSaga() {
	yield all([
		fork(treeCellscapeSagas)
	])
}


const TEST_DATA = {
	libraryID: "a90648a",
	fields: ["mad_neutral_state","MSRSI_non_integerness","cell_call", "all_heatmap_order"],
	caller: "single_cell_qc"
}


// Saga on page load; triggered with "LOAD_PAGE" action
/*export function* pageLoadSaga() {
	yield take("LOAD_PAGE")
	yield call(loadConfigSaga, TEST_DATA.caller)
	yield call(loadCellsSaga, TEST_DATA.libraryID, TEST_DATA.fields, TEST_DATA.caller)
}*/