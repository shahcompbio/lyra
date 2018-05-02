import reducer from "./reducer.js";
import {
  fetchIndexToIDMappings,
  fetchIndexToIDMappingsSuccess
} from "./actions.js";
import data from "utils/testData.js";

describe("tree cellscape: data/cells reducer", () => {
  const initialState = {
    tree: {
      data: {},
      pending: [],
      rootID: ""
    },
    segs: {
      data: {},
      pending: []
    },
    indexToID: {}
  };

  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle TREECELLSCAPE_FETCH_INDEX_ID_MAPPINGS", () => {
    expect(
      reducer(initialState, fetchIndexToIDMappings([0], data.testTreeNode))
    ).toEqual({
      tree: initialState.tree,
      segs: initialState.segs,
      indexToID: initialState.indexToID
    });
  });

  it("should handle TREECELLSCAPE_FETCH_INDEX_ID_MAPPINGS_SUCCESS", () => {
    expect(
      reducer(initialState, fetchIndexToIDMappingsSuccess([data.testSegs]))
    ).toEqual({
      tree: initialState.tree,
      segs: initialState.segs,
      indexToID: { undefined: data.testNodeID }
    });
  });

  it("should handle unrelated actions", () => {
    expect(reducer(initialState, { type: "UNKNOWN" })).toEqual(initialState);
  });
});
