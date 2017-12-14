/**
* Main reducer for entire app
*/

import { combineReducers } from 'redux'
import cells from './cells'
import ui from './ui'
import chromosomes from './chromosomes'

const montageApp = combineReducers({
	cells,
	ui,
	chromosomes
})


export default montageApp