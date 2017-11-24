/**
* Main reducer for entire app
*/

import { combineReducers } from 'redux'
import cells from './cells'
import ui from './ui'

const montageApp = combineReducers({
	cells,
	ui
})


export default montageApp