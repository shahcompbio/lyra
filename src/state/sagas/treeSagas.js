import { call, take, put, all, fork, takeEvery } from 'redux-saga/effects'
import { fetchTreeRoot, fetchTreeNode } from '../../elasticsearch/tree.js'
import { types as actions, fetchRootSuccess, fetchTreeNodeSuccess } from '../actions/tree.js'



export function* treeCellscapeSagas() {
	yield all([
		fork(treeCellscapeRootSaga),
		fork(treeCellscapeNodeWatcher)
	])
}


// Fetching tree root
function* treeCellscapeRootSaga() {
	yield take(actions.fetchRoot)
	const treeRoot = yield call(fetchTreeRoot)
	yield put(fetchRootSuccess(treeRoot))
} 


// Fetching tree node
function* treeCellscapeNodeWatcher() {
	yield takeEvery(actions.fetchTreeNode, fetchTreeCellscapeNode)
}

function* fetchTreeCellscapeNode(action) {
	const { nodeID } = action
	const nodeData = yield call(fetchTreeNode, nodeID)
	yield put(fetchTreeNodeSuccess(nodeData))
}