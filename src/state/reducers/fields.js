import { types as actions } from '../actions/cells.js'
import createReducer from './createReducer.js'



/*
Fields data (populated by sample/library)

	Object{field}

	where Field is 
	{
		id: 
		min/max/avg... if numerical
		Array[<values>] if categorical
	}

*/
const initialState = {}

const fields = createReducer(initialState)({
	[actions.receiveCells]: (state, action) => (
		Object.assign({}, action.fields)
	)
})


// General getters
const getFields = state => (state.fields)



// Returns { id, min, max } for given view + axis
// ASSUMES: axis is numerical data
// !!! State should be first argument (then can be used for sagas as well... if needed)
export const getAxisData = (view, state, axis) => {
	const fields = getFields(state)
	const axisName = view[axis]
	const stats = (({min, max}) => ({min, max}))(fields[axisName])

	return Object.assign({ id: axisName },
						stats)
}




export default fields