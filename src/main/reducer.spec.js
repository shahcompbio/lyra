import reducer from "./reducer.js";

import dashboard from "Dashboard/reducer.js";
import analyses from "./analyses/reducer.js";

describe("main reducer", () => {
  const initialState = reducer(undefined, {});

  it("initial state has analyses field", () => {
    expect(initialState.hasOwnProperty("analyses")).toEqual(true);
  });

  it("initial state has dashboard field", () => {
    expect(initialState.hasOwnProperty("dashboard")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      analyses: analyses(initialState["analyses"], action),
      dashboard: dashboard(initialState["dashboard"], action)
    });
  });
});
