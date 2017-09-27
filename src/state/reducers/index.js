import { combineReducers } from 'redux'
import config from './config'
import cells from './cells'
import fields from './fields'
import views from './views'

const montageApp = combineReducers({
	config,
	cells,
	fields,
	views
})


export default montageApp