import { delay } from "redux-saga";
import { all, fork, takeLatest, call, select, put } from "redux-saga/effects";
import actions from "./types.js";
import { getSegsPending } from "./selectors.js";
import { fetchSegsByIDs } from "./api.js";
import { fetchSegsSucess } from "./actions.js";

function* segsSagas() {
  yield all([fork(fetchSegsSagaWatcher)]);
}

function* fetchSegsSagaWatcher() {
  yield takeLatest(actions.fetchSegs, fetchSegsSaga);
}

function* fetchSegsSaga(action) {
  yield call(delay, 1000);

  const ids = yield select(getSegsPending);

  yield call(fetchSegsByIDsSaga, ids);
}

/**
 * Saga to fetch segments for list of cellIDs
 */
function* fetchSegsByIDsSaga(ids) {
  const segs = yield call(fetchSegsByIDs, ids);
  yield put(fetchSegsSuccess(segs, ids));
}

export default segsSagas;
