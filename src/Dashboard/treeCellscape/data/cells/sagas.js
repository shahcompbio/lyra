import treeSagas from "./tree/sagas.js";
import segsSagas from "./segs/sagas.js";
import { all, fork, takeEvery, call, put, select } from "redux-saga/effects";
import actions from "./types.js";
import { fetchIDsByIndices } from "./api.js";
import { fetchIndexToIDMappingsSuccess } from "./actions.js";
import { getSelectedTreeIndex } from "./localSelectors";

function* cellsSagas() {
  yield all([
    fork(treeSagas),
    fork(segsSagas),
    fork(fetchIndexToIDMappingsSagaWatcher)
  ]);
}

/**
 * Watcher saga for fetching index to ID mapping
 */
// Fetching tree node
function* fetchIndexToIDMappingsSagaWatcher() {
  yield takeEvery(actions.fetchIndexToIDMappings, fetchIndexToIDMappingsSaga);
}

/**
 * Saga to fetch cell IDs for given heatmap indices
 * @param {array} indices - heatmap indices to fetch
 */
function* fetchIndexToIDMappingsSaga(action) {
  const treeIndex = yield select(getSelectedTreeIndex);
  const ids = yield call(fetchIDsByIndices, action.indices, treeIndex);
  yield put(fetchIndexToIDMappingsSuccess(ids));
}
export default cellsSagas;
