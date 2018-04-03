import { all, fork, put, takeEvery } from "redux-saga/effects";
import ReactTooltip from "react-tooltip";
import { unhighlightElement } from "./actions.js";
import actions from "./types.js";

function* uiSagas() {
  yield all([
    fork(resetViewOnCladeZoomInWatcher),
    fork(resetViewOnCladeZoomOutWatcher)
  ]);
}

function* resetViewOnCladeZoomInWatcher() {
  yield takeEvery(actions.setTreeRoot, resetViewSaga);
}

function* resetViewOnCladeZoomOutWatcher() {
  yield takeEvery(actions.unsetTreeRoot, resetViewSaga);
}

function* resetViewSaga() {
  yield ReactTooltip.hide();
  yield put(unhighlightElement());
}

export default uiSagas;
