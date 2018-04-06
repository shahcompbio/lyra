/**
 * Reducer for segs
 */

import { combineReducers } from "redux";
import createReducer from "utils/createReducer.js";
import actions from "./types.js";

/**
 * pending {array}
 *    all cell IDs that are currently being fetched
 */

const initialPending = [];
const pending = createReducer(initialPending)({
  [actions.fetchSegs]: (state, action) => {
    const idsToAdd = action["ids"].filter(id => !state.includes(id));

    return idsToAdd.length > 0 ? mergeInOrder(state, idsToAdd) : state;
  },

  [actions.fetchSegsSuccess]: (state, action) => {
    const idsToRemove = action.ids;
    return idsToRemove.length > 0 ? removeInOrder(state, idsToRemove) : state;
  }
});

/**
 * Takes current state and new list and merges them
 * ASSUMES: both lists are already sorted
 */
const mergeInOrder = (state, list) => {
  if (state.length === 0) {
    return list;
  } else if (list.length === 0) {
    return state;
  } else {
    const [firstList, ...restList] = list;
    const [firstState, ...restState] = state;

    return firstList < firstState
      ? [firstList, ...mergeInOrder(state, restList)]
      : [firstState, ...mergeInOrder(restState, list)];
  }
};

/**
 *
 */
const removeInOrder = (state, list) => {
  if (list.length === 0) {
    return list;
  } else {
    const [firstList, ...restList] = list;
    const [firstState, ...restState] = state;

    return firstList === firstState
      ? [...removeInOrder(restState, restList)]
      : [firstState, ...removeInOrder(restState, list)];
  }
};

/**
 * data {object}
 * 	data.key {int} - heatmap index
 * 	data.value {array} - segments for that index
 */

const initialSegsData = {};
const data = createReducer(initialSegsData)({
  [actions.fetchSegsSuccess]: (state, action) => ({
    ...state,
    ...createSegMap(action.segs, action.ids)
  })
});

const createSegMap = (segs, ids) => {
  const segMap = ids.reduce(
    (idMap, id) => ({
      ...idMap,
      [id]: []
    }),
    {}
  );

  const segMapPopulated = segs.reduce((map, segment) => {
    const cellID = segment["cellID"];
    const newSegments = [...map[cellID], segment];

    return {
      ...map,
      [cellID]: newSegments
    };
  }, segMap);

  return segMapPopulated;
};

/**
 * Segs reducer
 * - pending
 * - data
 */
const reducer = combineReducers({
  pending,
  data
});

/**
 * State Selectors
 */
const getSegsData = state => state.data;
const getSegsPending = state => state.pending;

export const stateSelectors = {
  getSegsData,
  getSegsPending
};

export default reducer;
