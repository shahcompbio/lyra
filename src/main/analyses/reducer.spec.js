import reducer from "./reducer.js";
import {
  fetchAllAnalysis,
  fetchAllAnalysisSuccess,
  selectAnalysis
} from "./actions.js";

const testAnalysis = {
  description: "Shallow hTERT dataset",
  id: "SC-642_01",
  segsIndex: "sc-642_01_segs",
  title: "SC-642",
  treeIndex: "sc-642_01_tree",
  dashboard: "TREE_CELLSCAPE"
};

describe("tree cellscape: analysis reducer", () => {
  const initialState = {
    selectedID: null,
    data: {},
    order: []
  };

  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FETCH_ALL_ANALYSIS_SUCCESS", () => {
    expect(
      reducer(initialState, fetchAllAnalysisSuccess([testAnalysis]))
    ).toEqual({
      data: { "SC-642_01": testAnalysis },
      order: ["SC-642_01"],
      selectedID: null
    });
  });

  it("should handle SELECT_ANALYSIS", () => {
    expect(
      reducer(
        initialState,
        selectAnalysis({
          id: "SC-642_01"
        })
      )
    ).toEqual({
      data: {},
      order: [],
      selectedID: "SC-642_01"
    });
  });

  it("should handle unrelated actions", () => {
    expect(reducer(initialState, { type: "UNKNOWN" })).toEqual(initialState);
  });
});
