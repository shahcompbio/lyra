/**
* Main reducer for entire app
*/

import { combineReducers } from 'redux'
import cells from './cells'

const montageApp = combineReducers({
	cells
})


export default montageApp