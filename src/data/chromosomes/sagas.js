import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import actions from "./types.js";
import { fetchChromRangesSuccess } from "./actions.js";
import { fetchChromRanges } from "./api.js";

function* chromosomesSagas() {
  yield all([fork(fetchChromRangesWatcher)]);
}

/**
 * Watcher saga for fetching chromosome ranges
 */
// Fetching tree node
function* fetchChromRangesWatcher() {
  yield takeEvery(actions.fetchChromRanges, fetchChromRangesSaga);
}

/**
 * Saga to fetch chromosome ranges
 */
function* fetchChromRangesSaga() {
  const chromosomes = yield call(fetchChromRanges);
  yield put(fetchChromRangesSuccess(chromosomes));
}

export default chromosomesSagas;
