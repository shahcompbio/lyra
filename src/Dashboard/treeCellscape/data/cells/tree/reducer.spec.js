import reducer from "./reducer.js";
import {
  fetchTreeRootSuccess,
  fetchTreeNode,
  fetchTreeNodesSuccess,
  fetchAllTreeNodesSuccess
} from "./actions.js";
import data from "utils/testData.js";

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
    expect(
      reducer(initialState, fetchTreeRootSuccess(data.testTreeNode))
    ).toEqual({
      data: { [data.testNodeID]: data.testTreeNode },
      pending: initialState.pending,
      rootID: data.testNodeID
    });
  });

  it("should handle TREECELLSCAPE_FETCH_TREE_NODE", () => {
    expect(reducer(initialState, fetchTreeNode(data.testNodeID))).toEqual({
      data: initialState.data,
      rootID: initialState.rootID,
      pending: [data.testNodeID]
    });
  });

  it("should handle TREECELLSCAPE_FETCH_TREE_NODES_SUCCESS", () => {
    expect(
      reducer(initialState, fetchTreeNodesSuccess([data.testTreeNode], []))
    ).toEqual({
      data: { [data.testNodeID]: data.testTreeNode },
      pending: initialState.pending,
      rootID: initialState.rootID
    });
  });

  it("should handle TREECELLSCAPE_FETCH_ALL_TREE_NODES_SUCCESS", () => {
    expect(
      reducer(initialState, fetchAllTreeNodesSuccess([data.testTreeNode]))
    ).toEqual({
      data: { [data.testNodeID]: data.testTreeNode },
      pending: initialState.pending,
      rootID: initialState.rootID
    });
  });

  it("should handle unrelated actions", () => {
    expect(reducer(initialState, { type: "UNKNOWN" })).toEqual(initialState);
  });
});
