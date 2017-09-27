import {types as actions} from '../actions/config.js'
import createReducer from './createReducer.js'

/* 
Configuration of callers and their associated field types

config: {
	caller: Object of fields


	where each field:

	field: {
		id: <String>
		name: <String>
		type: "number" || "string"
	}

}
*/

const initialState = {}

const config = createReducer(initialState)({
	[actions.receiveConfig]: (state, action) => (
			Object.assign({}, state, {
				[action.caller]: action.fields
			})
		)
})


// Given list of fields and caller, returns fields with type numerical (Number) or categorical (string)
export const filterNumericalFields = (state, caller, fields) => (fields.filter((field) => isNumericalField(state, caller, field)))
export const filterCategoricalFields = (state, caller, fields) => (fields.filter((field) => isCategoricalField(state, caller, field)))


const isNumericalField = (state, caller, field) => ( getFieldType(state, caller, field) === "number" )
const isCategoricalField = (state, caller, field) => ( getFieldType(state, caller, field) === "string" )

const getFieldType = (state, caller, field) => (state.config[caller][field].type)




export default config