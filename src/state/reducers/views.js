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



// TODO: cry a bit and then refactor the Cellscape-centric actions from this
// 	In general, separate views (array) from individual view 

const initialState = []

const views = createReducer(initialState)({
	[actions.addScatterplot]: (state, action) => (
		[...state,
		action.view]
	),
	[actions.addCellscape]: (state, action) => (
		[...state,
		action.view]
	),


	[actions.receiveChromRanges]: (state, action) => (
		state.map(view => {
			return view.id === action.viewID ?
				{...view, chromRanges: action.chromRanges} :
				view
		})
	)
})

// General getters
export const getViews = state => (state.views)
export const getView = (state, viewID) => (state.views[viewID - 1])


export const getChromRanges = (state, viewID) => {
	let view = getView(state, viewID)
	return view.hasOwnProperty("chromRanges") ? view.chromRanges : null
}

export default views