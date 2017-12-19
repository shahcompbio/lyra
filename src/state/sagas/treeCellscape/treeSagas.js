/**
* Sagas for tree view of Tree Cellscape
*/

import { delay } from 'redux-saga'
import { all, fork, take, call, put, takeLatest, select } from 'redux-saga/effects'
import { types as actions, fetchTreeRootSuccess, fetchTreeNodesSuccess } from 'state/actions/treeCellscape.js'
import { fetchTreeRoot, fetchTreeNodes } from 'elasticsearch/treeCellscape.js'
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
		fork(fetchTreeNodesSagaWatcher)
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
function* fetchTreeNodesSagaWatcher() {
	yield takeLatest(actions.fetchTreeNode, fetchTreeNodesSaga)
}


/**
* Saga for fetching tree nodes from database and populating store
* @param {object} action 
*/
function* fetchTreeNodesSaga(action) {
	yield call(delay, 50)
	const nodeIDs = yield select(getTreePending)
	const nodeData = yield call(fetchTreeNodes, nodeIDs)
	yield put(fetchTreeNodesSuccess(nodeData, nodeIDs))
}