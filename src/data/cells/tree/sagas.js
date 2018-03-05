import { all, fork, take, call, put, takeEvery } from "redux-saga/effects";
import actions from "./types.js";
import { fetchTreeRootSuccess, fetchAllTreeNodesSuccess } from "./actions.js";
import { fetchTreeRoot, fetchAllTreeNodes } from "./api.js";

function* treeSagas() {
  yield all([fork(fetchTreeRootSaga), fork(fetchAllTreeNodesSagaWatcher)]);
}

// Fetching tree root
function* fetchTreeRootSaga() {
  yield take(actions.fetchTreeRoot);
  const treeRoot = yield call(fetchTreeRoot);
  yield put(fetchTreeRootSuccess(treeRoot));
}

// Fetching tree node
function* fetchAllTreeNodesSagaWatcher() {
  yield takeEvery(actions.fetchAllTreeNodes, fetchAllTreeNodesSaga);
}

function* fetchAllTreeNodesSaga() {
  const nodeData = yield call(fetchAllTreeNodes);
  yield put(fetchAllTreeNodesSuccess(nodeData));
}

export default treeSagas;
