import reducer from "./reducer.js";
import {
  fetchTreeRootSuccess,
  fetchTreeNode,
  fetchTreeNodesSuccess,
  fetchAllTreeNodesSuccess
} from "./actions.js";
import  data from "utils/testData.js";

describe("tree cellscape: data/cells/tree reducer", () => {
  const initialState = {
    rootID: "",
    data: {},
    pending: []
  };

  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle TREECELLSCAPE_FETCH_TREE_ROOT_SUCCESS", () => {
    expect(reducer(initialState, fetchTreeRootSuccess(data.testRecord))).toEqual({
      data:{[data.testNodeID]: data.testRecord},
      pending: [],
      rootID: data.testNodeID
    });
  });

  it("should handle TREECELLSCAPE_FETCH_TREE_NODE", () => {
    expect(reducer(initialState, fetchTreeNode(data.testNodeID))).toEqual({
      rootID: "",
      data: {},
      pending: [data.testNodeID]
    });
  });

  it("should handle TREECELLSCAPE_FETCH_TREE_NODES_SUCCESS", () => {
    expect(
      reducer(initialState, fetchTreeNodesSuccess([data.testRecord], [data.testNodeID]))
    ).toEqual({
      data:{[data.testNodeID]: data.testRecord},
      pending: [data.testNodeID]
    });
  });

  it("should handle TREECELLSCAPE_FETCH_ALL_TREE_NODES_SUCCESS", () => {
    expect(reducer(data.initialState, fetchAllTreeNodesSuccess([data.testRecord]))).toEqual({
      data:{[data.testNodeID]: data.testRecord},
      pending: [],
      rootID: ""
    });
  });

  it("should handle unrelated actions", () => {
    expect(reducer(initialState, { type: "UNKNOWN" })).toEqual(initialState);
  });
});
