import reducer from "./reducer.js";
import { resetDashboard } from "../main/actions.js";

describe("tree cellscape: Dashboard reducer", () => {
  const initialState = {
    selected: ""
  };

  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle RESET_DASHBOARD", () => {
    expect(reducer(initialState, resetDashboard())).toEqual({
      selected: ""
    });
  });

  it("should handle unrelated actions", () => {
    expect(reducer(initialState, { type: "UNKNOWN" })).toEqual(initialState);
  });
});
