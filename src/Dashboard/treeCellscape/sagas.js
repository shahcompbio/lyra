import dataSagas from "./data/sagas.js";
import uiSagas from "./ui/sagas.js";
import { all, fork } from "redux-saga/effects";

function* treeCellscapeSagas() {
  yield all([fork(dataSagas), fork(uiSagas)]);
}

export default treeCellscapeSagas;
