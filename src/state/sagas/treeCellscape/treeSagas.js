/**
* Sagas for tree view of Tree Cellscape
*/

import { all, fork, take, takeEvery, call, put } from 'redux-saga/effects'
import { types as actions, fetchTreeRootSuccess, fetchTreeNodeSuccess } from 'state/actions/treeCellscape.js'
import { fetchTreeRoot, fetchTreeNode } from 'elasticsearch/treeCellscape.js'

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
	yield takeEvery(actions.fetchTreeNode, fetchTreeNodeSaga)
}


/**
* Saga for fetching tree node from database and populating store
* @param {object} action 
* @param {string} action.nodeID - node to fetch
*/
function* fetchTreeNodeSaga(action) {
	const { nodeID } = action
	const nodeData = yield call(fetchTreeNode, nodeID)
	yield put(fetchTreeNodeSuccess(nodeData))
}