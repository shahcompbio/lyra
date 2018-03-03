import { delay } from "redux-saga";
import {
  all,
  fork,
  take,
  call,
  put,
  takeLatest,
  select
} from "redux-saga/effects";
import actions from "./types.js";
import {
  fetchTreeRootSuccess,
  fetchTreeNodesSuccess,
  fetchAllTreeNodesSuccess
} from "./actions.js";
import { fetchTreeRoot, fetchTreeNodes, fetchAllTreeNodes } from "./api.js";
import { getTreePending } from "./stateSelectors.js";

function* treeSagas() {
  yield all([fork(fetchTreeRootSaga), fork(fetchTreeNodesSagaWatcher)]);
}

// Fetching tree root
function* fetchTreeRootSaga() {
  yield take(actions.fetchTreeRoot);
  const treeRoot = yield call(fetchTreeRoot);
  yield put(fetchTreeRootSuccess(treeRoot));
}

// Fetching tree node
function* fetchTreeNodesSagaWatcher() {
  yield takeLatest(actions.fetchTreeNode, fetchTreeNodesSaga);
}

function* fetchTreeNodesSaga(action) {
  yield call(delay, 50);
  const nodeIDs = yield select(getTreePending);
  const nodeData = yield call(fetchTreeNodes, nodeIDs);
  yield put(fetchTreeNodesSuccess(nodeData, nodeIDs));
}

function* fetchAllTreeNodesSaga() {
  const nodeData = yield call(fetchAllTreeNodes);
  yield put(fetchAllTreeNodesSuccess(nodeData));
}

export default treeSagas;
