import {
  all,
  fork,
  take,
  call,
  put,
  takeEvery,
  select
} from "redux-saga/effects";
import actions from "./types.js";
import { fetchTreeRootSuccess, fetchAllTreeNodesSuccess } from "./actions.js";
import { fetchTreeRoot, fetchAllTreeNodes } from "./api.js";
import { getSelectedTreeIndex } from "./stateSelectors.js";

function* treeSagas() {
  yield all([fork(fetchTreeRootWatcher), fork(fetchAllTreeNodesSagaWatcher)]);
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
function* fetchAllTreeNodesSagaWatcher() {
  yield takeEvery(actions.fetchAllTreeNodes, fetchAllTreeNodesSaga);
}

function* fetchAllTreeNodesSaga() {
  const treeIndex = yield select(getSelectedTreeIndex);
  const nodeData = yield call(fetchAllTreeNodes, treeIndex);
  yield put(fetchAllTreeNodesSuccess(nodeData));
}

export default treeSagas;
