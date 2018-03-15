import { all, fork, takeEvery, put } from "redux-saga/effects";
import actions from "./types.js";
import { resetDashboard } from "main/actions.js";

function* selectedSagas() {
  yield all([fork(selectingAnalysisWatcher)]);
}

function* selectingAnalysisWatcher() {
  yield takeEvery(actions.selectAnalysis, selectingAnalysisSaga);
}

function* selectingAnalysisSaga() {
  yield put(resetDashboard());
}

export default selectedSagas;
