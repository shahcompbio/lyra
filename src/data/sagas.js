import cellsSagas from "./cells/sagas.js";
import chromosomesSagas from "./chromosomes/sagas.js";
import analysisSagas from "./analysis/sagas.js";
import { all, fork } from "redux-saga/effects";

function* dataSagas() {
  yield all([fork(cellsSagas), fork(chromosomesSagas), fork(analysisSagas)]);
}

export default dataSagas;
