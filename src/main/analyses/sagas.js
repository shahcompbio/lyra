import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import actions from "./types.js";
import { fetchAllAnalysisSuccess } from "./actions.js";
import { fetchAllAnalysis } from "./api.js";
import { resetDashboard } from "main/actions.js";

function* analysisSagas() {
  yield all([fork(fetchAllAnalysisWatcher)]);
}

function* fetchAllAnalysisWatcher() {
  yield takeEvery(actions.fetchAllAnalysis, fetchAllAnalysisSaga);
}

function* fetchAllAnalysisSaga() {
  const analysis = yield call(fetchAllAnalysis);
  yield put(fetchAllAnalysisSuccess(analysis));
}

export default analysisSagas;
