import uiSagas from "./ui/sagas.js";
import { all, fork } from "redux-saga/effects";

function* treeCellscapeSagas() {
  yield all([fork(uiSagas)]);
}

export default treeCellscapeSagas;
