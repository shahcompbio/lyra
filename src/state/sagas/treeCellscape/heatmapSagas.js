/**
* Sagas for heatmap view of Tree Cellscape
*/



import { delay } from 'redux-saga'
import { all, fork, takeLatest, call, select, put, takeEvery } from 'redux-saga/effects'
import { types as actions, fetchIndexToIDMappingsSuccess, fetchSegsSuccess, fetchChromRangesSuccess } from 'state/actions/treeCellscape.js'

import { getSegsPending, getIDsByIndex, getMissingIDMappings } from 'state/selectors/treeCellscape.js'
import { fetchIDsByIndices, fetchSegsByIDs, fetchChromRanges } from 'elasticsearch/treeCellscape.js'



/**
* All sagas related to heatmap
* - heatmap row segment fetching
*/

export function* heatmapSagas() {
	yield all([
		fork(fetchSegsSagaWatcher),
		fork(fetchChromRangesWatcher)
	])
}




/**
* Watcher saga for fetching segments
*/
// Fetching tree node
function* fetchSegsSagaWatcher() {
	yield takeLatest(actions.fetchSegs, fetchSegsSaga)
}


/**
* Saga to fetch heatmap row segments for list of heatmap indices
* @param {array} indices - heatmap indices to fetch
*/
function* fetchSegsSaga(action) {
	yield call(delay, 1000)

	// Get all heatmap indices we need segments for 
	const indices = yield select(getSegsPending)

	// Fetch missing index to ID mappings
	const missingIDs = yield select(getMissingIDMappings, indices)
	if (missingIDs.length > 0) {
		yield call(fetchIndexToIDMappingsSaga, missingIDs)
	}

	// Fetch all segments for mapped cellIDs
	const cellIDs = yield select(getIDsByIndex, indices)
	yield call(fetchSegsByIDsSaga, indices, cellIDs)
	
}



/**
* Saga to fetch cell IDs for given heatmap indices
* @param {array} indices - heatmap indices to fetch
*/
function* fetchIndexToIDMappingsSaga(indices) {
	const ids = yield call(fetchIDsByIndices, indices)
	yield put(fetchIndexToIDMappingsSuccess(ids))
}


/**
* Saga to fetch segments for list of cellIDs
*/
function* fetchSegsByIDsSaga(indices, ids) {
	const segs = yield call(fetchSegsByIDs, ids)
	yield put(fetchSegsSuccess(segs, indices, ids))
}



/**
* Watcher saga for fetching chromosome ranges
*/
// Fetching tree node
function* fetchChromRangesWatcher() {
	yield takeEvery(actions.fetchChromRanges, fetchChromRangesSaga)
}


/**
* Saga to fetch chromosome ranges
*/
function* fetchChromRangesSaga() {
	const chromosomes = yield call(fetchChromRanges)
	yield put(fetchChromRangesSuccess(chromosomes))
}