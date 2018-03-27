import treeCellscapeSagas from "treeCellscape/sagas.js";
import analysisSagas from "./analysis/sagas.js";
import loggerSaga from "./logger/sagas.js";
import { all, fork } from "redux-saga/effects";

function* rootSaga() {
  yield all([fork(treeCellscapeSagas), fork(analysisSagas)]);
}

export default rootSaga;
