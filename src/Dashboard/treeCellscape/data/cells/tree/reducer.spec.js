import reducer, {
  initialRootID,
  rootID,
  initialData,
  data,
  initialPending,
  pending
} from "./reducer.js";
import {
  fetchTreeRootSuccess,
  fetchTreeNode,
  fetchTreeNodesSuccess,
  fetchAllTreeNodesSuccess
} from "./actions.js";

import { NODE1, NODE_ID1, NODE2, NODE_ID2 } from "../../../mock/nodes.js";

/**
 * Root ID
 */
describe("tree cellscape: data/cells/tree rootID reducer", () => {
  it("should return initial state", () => {
    expect(rootID(undefined, {})).toEqual(initialRootID);
  });

  it("should handle TREECELLSCAPE_FETCH_TREE_ROOT_SUCCESS", () => {
    expect(rootID(initialRootID, fetchTreeRootSuccess(NODE1))).toEqual(
      NODE_ID1
    );
  });

  it("should handle unrelated actions", () => {
    expect(rootID(initialRootID, { type: "UNKNOWN" })).toEqual(initialRootID);
  });
});

/**
 * Data
 */
describe("tree cellscape: data/cells/tree data reducer", () => {
  it("should return initial state", () => {
    expect(data(undefined, {})).toEqual(initialData);
  });

  it("should handle TREECELLSCAPE_FETCH_TREE_ROOT_SUCCESS", () => {
    const { children, ...NODE1_NO_SUBS } = NODE1;
    expect(data(initialData, fetchTreeRootSuccess(NODE1))).toEqual({
      [NODE_ID1]: NODE1_NO_SUBS
    });
  });

  it("should handle TREECELLSCAPE_FETCH_TREE_NODES_SUCCESS", () => {
    expect(
      data(
        initialData,
        fetchTreeNodesSuccess([NODE1, NODE2], [NODE_ID1, NODE_ID2])
      )
    ).toEqual({ [NODE_ID1]: NODE1, [NODE_ID2]: NODE2 });
  });

  it("should handle unrelated actions", () => {
    expect(data(initialData, { type: "UNKNOWN" })).toEqual(initialData);
  });
});

/**
 * Pending
 */
describe("tree cellscape: data/cells/tree pending reducer", () => {
  it("should return initial state", () => {
    expect(pending(undefined, {})).toEqual(initialPending);
  });

  it("should handle TREECELLSCAPE_FETCH_TREE_NODE", () => {
    expect(pending(initialPending, fetchTreeNode(NODE_ID1))).toEqual([
      NODE_ID1
    ]);
  });

  it("should handle TREECELLSCAPE_FETCH_TREE_NODES_SUCCESS", () => {
    expect(
      pending(
        [NODE_ID1, NODE_ID2],
        fetchTreeNodesSuccess([NODE1, NODE2], [NODE_ID1, NODE_ID2])
      )
    ).toEqual([]);
  });

  it("should handle unrelated actions", () => {
    expect(pending(initialPending, { type: "UNKNOWN" })).toEqual(
      initialPending
    );
  });
});

/**
 * Tree
 */

describe("tree cellscape: data/cells/tree reducer", () => {
  const initialState = reducer(undefined, {});
  it("initial state has rootID field", () => {
    expect(initialState.hasOwnProperty("rootID")).toEqual(true);
  });

  it("initial state has data field", () => {
    expect(initialState.hasOwnProperty("data")).toEqual(true);
  });

  it("initial state has pending field", () => {
    expect(initialState.hasOwnProperty("pending")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      rootID: rootID(initialState["rootID"], action),
      data: data(initialState["data"], action),
      pending: pending(initialState["pending"], action)
    });
  });
});
