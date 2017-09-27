import { put, call } from 'redux-saga/effects'
import { fetchConfig } from '../elasticsearch/config.js'
import { receiveConfig } from '../actions/config.js'

/*
 Sagas for config
*/


// Load config - includes fetching and receiving
// TODO: Will want to change so it'll trigger when dashboard has been selected
export function* loadConfigSaga(caller) {

	const config = yield call(fetchConfig, caller)

	yield put(receiveConfig(caller, config))


}