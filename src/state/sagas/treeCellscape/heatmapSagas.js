/**
* Sagas for heatmap view of Tree Cellscape
*/



import { delay } from 'redux-saga'
import { all, fork, takeLatest, call, select, put } from 'redux-saga/effects'
import { types as actions, fetchIndexToIDMappingsSuccess, fetchSegsSuccess } from 'state/actions/treeCellscape.js'

import { getSegsPending, getIDsByIndex, getMissingIDMappings } from 'state/selectors/treeCellscape.js'
import { fetchIDsByIndicesFromAPI, fetchSegsByIDsFromAPI } from 'elasticsearch/treeCellscape.js'



/**
* All sagas related to heatmap
* - heatmap row segment fetching
*/

export function* heatmapSagas() {
	yield all([
		fork(fetchSegsSagaWatcher)
	])
}




/**
* Watcher saga for fetching segments
*/
// Fetching tree node
function* fetchSegsSagaWatcher() {
	yield takeLatest(actions.fetchSegs, fetchSegs)
}


/**
* Saga to fetch heatmap row segments for list of heatmap indices
* @param {array} indices - heatmap indices to fetch
*/
function* fetchSegs(action) {
	yield call(delay, 500)

	// Get all heatmap indices we need segments for 
	const indices = yield select(getSegsPending)

	// Fetch missing index to ID mappings
	const missingIDs = yield select(getMissingIDMappings, indices)
	if (missingIDs.length > 0) {
		yield call(fetchIndexToIDMappings, missingIDs)
	}

	// Fetch all segments for mapped cellIDs
	const cellIDs = yield select(getIDsByIndex, indices)
	yield call(fetchSegsByIDs, indices, cellIDs)
	
}



/**
* Saga to fetch cell IDs for given heatmap indices
* @param {array} indices - heatmap indices to fetch
*/
function* fetchIndexToIDMappings(indices) {
	const ids = yield call(fetchIDsByIndicesFromAPI, indices)
	yield put(fetchIndexToIDMappingsSuccess(ids))
}


/**
* Saga to fetch segments for list of cellIDs
*/
function* fetchSegsByIDs(indices, ids) {
	const segs = yield call(fetchSegsByIDsFromAPI, ids)
	yield put(fetchSegsSuccess(segs, indices, ids))
}