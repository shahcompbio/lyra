import createReducer from "utils/createReducer.js";
import actions from "./types.js";

export const initialIsPloidyNormalized = false;
export const isPloidyNormalized = createReducer(initialIsPloidyNormalized)({
  [actions.switchNormalizePloidy]: (state, action) => !state
});

export default isPloidyNormalized;
