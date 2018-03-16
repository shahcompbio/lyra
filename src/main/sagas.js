import treeCellscapeSagas from "treeCellscape/sagas.js";
import browseSagas from "./analysis/sagas.js";
import loggerSaga from "./logger/sagas.js";
import { all, fork } from "redux-saga/effects";

function* rootSaga() {
  yield all([fork(treeCellscapeSagas), fork(browseSagas)]);
}

export default rootSaga;