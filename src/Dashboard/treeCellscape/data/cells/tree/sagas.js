import {
  all,
  fork,
  call,
  put,
  takeEvery,
  select,
  takeLatest
} from "redux-saga/effects";
import { delay } from "redux-saga";
import actions from "./types.js";
import {
  fetchTreeRootSuccess,
  fetchAllTreeNodesSuccess,
  fetchTreeNodesSuccess
} from "./actions.js";
import { fetchTreeRoot, fetchAllTreeNodes, fetchTreeNodes } from "./api.js";
import { getSelectedTreeIndex, getTreePending } from "./localSelectors.js";

function* treeSagas() {
  yield all([
    fork(fetchTreeRootWatcher),
    fork(fetchAllTreeNodesSagaWatcher),
    fork(fetchTreeNodesSagaWatcher)
  ]);
}

// Fetching tree root
function* fetchTreeRootWatcher() {
  yield takeEvery(actions.fetchTreeRoot, fetchTreeRootSaga);
}

function* fetchTreeRootSaga() {
  const treeIndex = yield select(getSelectedTreeIndex);
  const treeRoot = yield call(fetchTreeRoot, treeIndex);
  yield put(fetchTreeRootSuccess(treeRoot));
}

// Fetching tree node
function* fetchTreeNodesSagaWatcher() {
  yield takeLatest(actions.fetchTreeNode, fetchTreeNodesSaga);
}

function* fetchTreeNodesSaga(action) {
  yield call(delay, 50);
  const nodeIDs = yield select(getTreePending);
  const treeIndex = yield select(getSelectedTreeIndex);
  const nodeData = yield call(fetchTreeNodes, nodeIDs, treeIndex);
  yield put(fetchTreeNodesSuccess(nodeData, nodeIDs));
}

// Fetching tree node
function* fetchAllTreeNodesSagaWatcher() {
  yield takeEvery(actions.fetchAllTreeNodes, fetchAllTreeNodesSaga);
}

function* fetchAllTreeNodesSaga() {
  const treeIndex = yield select(getSelectedTreeIndex);
  const nodeData = yield call(fetchAllTreeNodes, treeIndex);
  yield put(fetchAllTreeNodesSuccess(nodeData));
}

export default treeSagas;
