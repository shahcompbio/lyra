import reducer from "./reducer.js";
import highlighted from "./highlighted/reducer.js";
import root from "./root/reducer.js";

/**
 * UI
 */

describe("tree cellscape: ui reducer", () => {
  const initialState = reducer(undefined, {});
  it("initial state has highlighted field", () => {
    expect(initialState.hasOwnProperty("highlighted")).toEqual(true);
  });

  it("initial state has root field", () => {
    expect(initialState.hasOwnProperty("root")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      highlighted: highlighted(initialState["highlighted"], action),
      root: root(initialState["root"], action)
    });
  });
});
