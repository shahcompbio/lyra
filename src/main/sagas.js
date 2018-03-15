import treeCellscapeSagas from "treeCellscape/sagas.js";
import browseSagas from "browse/analysis/sagas.js";
import loggerSaga from "./logger/sagas.js";
import { all, fork, take, select } from "redux-saga/effects";

function* rootSaga() {
  yield all([fork(treeCellscapeSagas), fork(browseSagas), fork(loggerSaga)]);
}

export default rootSaga;
