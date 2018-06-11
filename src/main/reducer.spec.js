import reducer, {
  selectedAnalysis,
  initialSelectedAnalysis
} from "./reducer.js";

import dashboard from "Dashboard/reducer.js";
import { selectAnalysis } from "./actions.js";

import {
  ANALYSIS1,
  ANALYSIS_ID1,
  ANALYSIS2,
  ANALYSIS_ID2
} from "./mock/analysis.js";

describe("main reducer", () => {
  const initialState = reducer(undefined, {});

  it("initial state has selectedAnalysis field", () => {
    expect(initialState.hasOwnProperty("selectedAnalysis")).toEqual(true);
  });

  it("initial state has dashboard field", () => {
    expect(initialState.hasOwnProperty("dashboard")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      selectedAnalysis: selectedAnalysis(
        initialState["selectedAnalysis"],
        action
      ),
      dashboard: dashboard(initialState["dashboard"], action)
    });
  });
});
