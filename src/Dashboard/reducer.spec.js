import reducer, { initialSelected, selected } from "./reducer.js";
import { selectAnalysis } from "../main/actions.js";
import treeCellscapeReducer from "./treeCellscape/reducer.js";
import { ANALYSIS1 } from "../main/mock/analysis.js";

/**
 * selected
 */
describe("Dashboard selected reducer", () => {
  it("should return initial state", () => {
    expect(selected(undefined, {})).toEqual(initialSelected);
  });

  it("should handle SELECT_ANALYSIS", () => {
    expect(selected(initialSelected, selectAnalysis(ANALYSIS1))).toEqual(
      "TREE_CELLSCAPE"
    );
  });

  it("should handle unrelated actions", () => {
    expect(selected(initialSelected, { type: "UNKNOWN" })).toEqual(
      initialSelected
    );
  });
});

/**
 * Dashboard
 */

describe("Dashboard reducer", () => {
  const initialState = reducer(undefined, {});
  it("initial state has selected field", () => {
    expect(initialState.hasOwnProperty("selected")).toEqual(true);
  });

  it("initial state does not have dashboard field", () => {
    expect(initialState.hasOwnProperty("dashboard")).toEqual(false);
  });

  it("initial state passes down actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      selected: selected(initialState["selected"], action)
    });
  });

  const selectDashboardState = reducer(initialState, selectAnalysis(ANALYSIS1));
  const selectedState = reducer(selectDashboardState, {});
  it("selected state has selected field", () => {
    expect(selectedState.hasOwnProperty("selected")).toEqual(true);
  });

  it("selected state has dashboard field", () => {
    expect(selectedState.hasOwnProperty("dashboard")).toEqual(true);
  });

  it("selected state passes down actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(selectedState, action)).toEqual({
      selected: selected(selectedState["selected"], action),
      dashboard: treeCellscapeReducer(selectedState["dashboard"], action)
    });
  });
});
