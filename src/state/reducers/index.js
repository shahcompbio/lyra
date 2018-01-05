/**
* Main reducer for entire app
*/

import { combineReducers } from 'redux'
import cells, { stateSelectors as cellStateSelectors } from './cells'
import ui, { stateSelectors as uiStateSelectors } from './ui'
import chromosomes, { stateSelectors as chromosomesStateSelectors } from './chromosomes'

import shiftSelectors from 'state/reducers/utils/shiftSelectors.js'

/**
* montageApp reducer
*/
const montageApp = combineReducers({
	cells,
	ui,
	chromosomes
})



/**
* montageApp selectors
*/


const cellsSelector = state => state.cells
const uiSelector = state => state.ui
const chromosomesSelector = state => state.chromosomes

export const stateSelectors = {
	cellsSelector,
	uiSelector,
	chromosomesSelector,
	...shiftSelectors(cellsSelector, cellStateSelectors),
	...shiftSelectors(uiSelector, uiStateSelectors),
	...shiftSelectors(chromosomesSelector, chromosomesStateSelectors)
}



export default montageApp