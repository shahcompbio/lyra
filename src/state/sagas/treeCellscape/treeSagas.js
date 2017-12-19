/**
* Sagas for tree view of Tree Cellscape
*/

import { delay } from 'redux-saga'
import { all, fork, take, call, put, takeLatest, takeEvery, select } from 'redux-saga/effects'
import { types as actions, fetchTreeRootSuccess, fetchTreeNodeSuccess } from 'state/actions/treeCellscape.js'
import { fetchTreeRoot, fetchTreeNode } from 'elasticsearch/treeCellscape.js'
import { getTreePending } from 'state/selectors/treeCellscape.js'

/**
* All sagas related to tree view
* - tree root fetching
* - tree node fetching
* @public
*/
export function* treeSagas() {
	yield all([
		fork(fetchTreeRootSaga),
		fork(fetchTreeNodeSagaWatcher)
	])
}

/**
* Saga for fetching tree root from database and populating store
*/
// Fetching tree root
function* fetchTreeRootSaga() {
	yield take(actions.fetchTreeRoot)
	const treeRoot = yield call(fetchTreeRoot)
	yield put(fetchTreeRootSuccess(treeRoot))
} 




/**
* Watcher saga for fetching tree nodes
*/
// Fetching tree node
function* fetchTreeNodeSagaWatcher() {
	yield takeLatest(actions.fetchTreeNode, fetchTreeNodeSaga)
}


/**
* Saga for fetching tree node from database and populating store
* @param {object} action 
* @param {string} action.nodeID - node to fetch
*/
function* fetchTreeNodeSaga(action) {
	yield call(delay, 50)
	const nodeIDs = yield select(getTreePending)
	const nodeData = yield call(fetchTreeNode, nodeIDs)
	yield put(fetchTreeNodeSuccess(nodeData, nodeIDs))
}