import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import selectedSagas from "./selected/sagas.js";
import actions from "./types.js";
import { fetchAllAnalysisSuccess } from "./actions.js";
import { fetchAllAnalysis } from "./api.js";

function* analysisSagas() {
  yield all([fork(fetchAllAnalysisWatcher), fork(selectedSagas)]);
}

function* fetchAllAnalysisWatcher() {
  yield takeEvery(actions.fetchAllAnalysis, fetchAllAnalysisSaga);
}

function* fetchAllAnalysisSaga() {
  const analysis = yield call(fetchAllAnalysis);
  yield put(fetchAllAnalysisSuccess(analysis));
}

export default analysisSagas;
