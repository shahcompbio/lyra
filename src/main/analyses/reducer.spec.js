import reducer, {
  initialOrder,
  order,
  initialData,
  data,
  initialSelectedID,
  selectedID,
  initialSelectedDashboard,
  selectedDashboard,
  initialDashboards,
  dashboards
} from "./reducer.js";
import {
  fetchAllAnalysis,
  fetchAllAnalysisSuccess,
  selectAnalysis
} from "./actions.js";

import {
  ANALYSIS1,
  ANALYSIS_ID1,
  ANALYSIS2,
  ANALYSIS_ID2
} from "../mock/analysis.js";

/**
 * Order
 */
describe("main: analyses order reducer", () => {
  it("should return initial state", () => {
    expect(order(undefined, {})).toEqual(initialOrder);
  });

  it("should handle FETCH_ALL_ANALYSIS_SUCCESS", () => {
    expect(
      order(initialOrder, fetchAllAnalysisSuccess([ANALYSIS1, ANALYSIS2]))
    ).toEqual([ANALYSIS_ID1, ANALYSIS_ID2]);
  });

  it("should handle unrelated actions", () => {
    expect(order(initialOrder, { type: "UNKNOWN" })).toEqual(initialOrder);
  });
});

/**
 * Data
 */
describe("main: analyses data reducer", () => {
  it("should return initial state", () => {
    expect(data(undefined, {})).toEqual(initialData);
  });

  it("should handle FETCH_ALL_ANALYSIS_SUCCESS", () => {
    expect(
      data(initialData, fetchAllAnalysisSuccess([ANALYSIS1, ANALYSIS2]))
    ).toEqual({
      [ANALYSIS_ID1]: ANALYSIS1,
      [ANALYSIS_ID2]: ANALYSIS2
    });
  });

  it("should handle unrelated actions", () => {
    expect(data(initialData, { type: "UNKNOWN" })).toEqual(initialData);
  });
});

/**
 * Dashboards
 */
describe("main: analyses dashboards reducer", () => {
  it("should return initial state", () => {
    expect(dashboards(undefined, {})).toEqual(initialDashboards);
  });

  it("should handle FETCH_ALL_ANALYSIS_SUCCESS", () => {
    expect(
      dashboards(
        initialDashboards,
        fetchAllAnalysisSuccess([ANALYSIS1, ANALYSIS2])
      )
    ).toEqual(["TREE_CELLSCAPE"]);
  });

  it("should handle unrelated actions", () => {
    expect(dashboards(initialDashboards, { type: "UNKNOWN" })).toEqual(
      initialDashboards
    );
  });
});

/**
 * SelectedID
 */
describe("main: analyses selectedID reducer", () => {
  it("should return initial state", () => {
    expect(selectedID(undefined, {})).toEqual(initialSelectedID);
  });

  it("should handle SELECT_ANALYSIS", () => {
    expect(selectedID(initialSelectedID, selectAnalysis(ANALYSIS1))).toEqual(
      ANALYSIS_ID1
    );
  });

  it("should handle unrelated actions", () => {
    expect(selectedID(initialSelectedID, { type: "UNKNOWN" })).toEqual(
      initialSelectedID
    );
  });
});

/**
 * SelectedDashboard
 */
describe("main: analyses selectedDashboard reducer", () => {
  it("should return initial state", () => {
    expect(selectedDashboard(undefined, {})).toEqual(initialSelectedDashboard);
  });

  it("should handle SELECT_ANALYSIS", () => {
    expect(
      selectedDashboard(initialSelectedDashboard, selectAnalysis(ANALYSIS1))
    ).toEqual("TREE_CELLSCAPE");
  });

  it("should handle unrelated actions", () => {
    expect(
      selectedDashboard(initialSelectedDashboard, { type: "UNKNOWN" })
    ).toEqual(initialSelectedDashboard);
  });
});

/**
 * Analyses
 */
describe("main: analyses reducer", () => {
  const initialState = reducer(undefined, {});
  it("initial state should have selectedID field", () => {
    expect(initialState.hasOwnProperty("selectedID")).toEqual(true);
  });

  it("initial state should have selectedDashboard field", () => {
    expect(initialState.hasOwnProperty("selectedDashboard")).toEqual(true);
  });

  it("initial state should have data field", () => {
    expect(initialState.hasOwnProperty("data")).toEqual(true);
  });

  it("initial state should have order field", () => {
    expect(initialState.hasOwnProperty("order")).toEqual(true);
  });

  it("initial state should have dashboards field", () => {
    expect(initialState.hasOwnProperty("dashboards")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      selectedID: selectedID(initialState["selectedID"], action),
      selectedDashboard: selectedDashboard(
        initialState["selectedDashboard"],
        action
      ),
      data: data(initialState["data"], action),
      order: order(initialState["order"], action),
      dashboards: dashboards(initialState["dashboards"], action)
    });
  });
});
