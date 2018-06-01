import treeCellscapeSagas from "Dashboard/sagas.js";
import loggerSaga from "./logger/sagas.js";
import { all, fork, takeEvery, put } from "redux-saga/effects";

import { resetDashboard } from "./actions.js";
import actions from "./types";

function* rootSaga() {
  yield all([
    fork(treeCellscapeSagas),
    fork(resetAfterSelectAnalysisWatcher),
    fork(loggerSaga)
  ]);
}

function* resetAfterSelectAnalysisWatcher() {
  yield takeEvery(actions.selectAnalysis, resetAfterSelectAnalysisSaga);
}

function* resetAfterSelectAnalysisSaga() {
  yield put(resetDashboard());
}

export default rootSaga;
