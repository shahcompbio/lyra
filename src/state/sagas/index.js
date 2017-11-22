/**
* All main sagas
*/

import { fork, all } from 'redux-saga/effects'
import { treeCellscapeSagas } from './treeCellscapeSagas.js'

/**
* All sagas
* - treeCellscape sagas
* @public
*/
export function* rootSaga() {
	yield all([
		fork(treeCellscapeSagas)
	])
}
