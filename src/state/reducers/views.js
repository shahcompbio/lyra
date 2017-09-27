import { types as actions } from '../actions/views.js'
import createReducer from './createReducer.js'


/*
Views

	Array[<View>]

	where View is:

	Object {
		viewID: <Number>
		plot: <String>
		... any dimensions
	}

*/


const initialState = []

const views = createReducer(initialState)({
	[actions.addScatterplot]: (state, action) => (
		[...state,
		action.view]
	)
})

// General getters
export const getViews = state => (state.views)

export default views