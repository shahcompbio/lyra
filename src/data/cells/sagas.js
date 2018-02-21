import treeSagas from "./tree/sagas.js";
import segsSagas from "./segs/sagas.js";
import { all, fork } from "redux-saga/effects";

function* cellsSagas() {
  yield all([fork(treeSagas), fork(segsSagas)]);
}

export default cellsSagas;
