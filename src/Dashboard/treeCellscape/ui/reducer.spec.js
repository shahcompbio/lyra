import reducer from "./reducer.js";
import { setTreeRoot, unsetTreeRoot } from "./actions.js";
import data from "utils/testData.js";

describe("tree cellscape: highlighted reducer", () => {
  const initialState = {
    highlighted: {
      element: null,
      index: null,
      range: null
    },
    treePath: []
  };

  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle TREECELLSCAPE_SET_TREE_ROOT for row", () => {
    expect(reducer(initialState, setTreeRoot(data.testNodeID))).toEqual({
      treePath: [data.testNodeID],
      highlighted: initialState.highlighted
    });
  });

  it("should handle TREECELLSCAPE_UNSET_TREE_ROOT for cluster", () => {
    expect(reducer(initialState, unsetTreeRoot())).toEqual({
      highlighted: initialState.highlighted,
      treePath: initialState.treePath
    });
  });

  it("should handle unrelated actions", () => {
    expect(reducer(initialState, { type: "UNKNOWN" })).toEqual(initialState);
  });
});
