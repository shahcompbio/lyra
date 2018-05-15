import reducer from "./reducer.js";

import cells from "./cells/reducer.js";
import chromosomes from "./chromosomes/reducer.js";

/**
 * Chromosomes
 */
describe("tree cellscape: data reducer", () => {
  const initialState = reducer(undefined, {});

  it("initial state has cells field", () => {
    expect(initialState.hasOwnProperty("cells")).toEqual(true);
  });

  it("initial state has chromosomes field", () => {
    expect(initialState.hasOwnProperty("chromosomes")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      cells: cells(initialState["cells"], action),
      chromosomes: chromosomes(initialState["chromosomes"], action)
    });
  });
});
