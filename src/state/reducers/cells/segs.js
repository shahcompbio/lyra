/**
* Reducer for segs
*/


import createReducer from '../createReducer.js'
import { types as actions } from 'state/actions/treeCellscape.js'


const initialSegs = {}


/**
* segs {object}
* 	seg.key {int} - heatmap index
* 	seg.value {array} - segments for that index
*/

const segs = createReducer(initialSegs)({

})







/**
* State Selectors
*/

export const segsSelector = (state) => state.cells.segs

export default segs