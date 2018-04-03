import cellsSagas from "./cells/sagas.js";
import chromosomesSagas from "./chromosomes/sagas.js";
import { all, fork } from "redux-saga/effects";

function* dataSagas() {
  yield all([fork(cellsSagas), fork(chromosomesSagas)]);
}

export default dataSagas;
