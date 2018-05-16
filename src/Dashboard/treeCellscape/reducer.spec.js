import reducer from "./reducer.js";

import data from "./data/reducer.js";
import ui from "./ui/reducer.js";

/**
 * Chromosomes
 */
describe("tree cellscape: root reducer", () => {
  const initialState = reducer(undefined, {});

  it("initial state has data field", () => {
    expect(initialState.hasOwnProperty("data")).toEqual(true);
  });

  it("initial state has ui field", () => {
    expect(initialState.hasOwnProperty("ui")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      data: data(initialState["data"], action),
      ui: ui(initialState["ui"], action)
    });
  });
});
