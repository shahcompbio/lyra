/**
* Reducer for cells
*/

import { combineReducers } from 'redux'
import tree from './cells/tree.js'



/**
* Cell reducer
* - tree
*/
const cells = combineReducers({
	tree
})


export default cells