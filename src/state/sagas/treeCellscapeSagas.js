/**
* Tree Cellscape sagas
*/

import { all, fork } from 'redux-saga/effects'
import { treeSagas } from './treeCellscape/treeSagas.js'

/**
* All sagas related to treeCellscape
* - tree sagas
* @public
*/
export function* treeCellscapeSagas() {
	yield all([
		fork(treeSagas)
	])
}