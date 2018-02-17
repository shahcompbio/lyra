/**
 * Abstract function to create reducers, given initial state and action map
 *
 * where action map is
 * {
 * 	<action type>: (state, action) => {}
 * }
 */

const createReducer = initialState => handlers => (
	state = initialState,
	action
) => {
	const reducer = handlers[action.type];
	return reducer ? reducer(state, action) : state;
};

export default createReducer;
