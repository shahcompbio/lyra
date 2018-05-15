import reducer, { initialIndexToID, indexToID } from "./reducer.js";
import tree from "./tree/reducer.js";
import segs from "./segs/reducer.js";

import {
  fetchIndexToIDMappings,
  fetchIndexToIDMappingsSuccess,
  fetchAllTreeNodesSuccess,
  fetchTreeNodesSuccess
} from "./actions.js";
import {
  NODE1,
  NODE_ID1,
  NODE_INDEX1,
  NODE2,
  NODE_ID2,
  NODE_INDEX2
} from "../../mock/nodes.js";

/**
 * indexToID
 */
describe("tree cellscape: data/cells indexToID reducer", () => {
  it("should return initial state", () => {
    expect(indexToID(undefined, {})).toEqual(initialIndexToID);
  });

  it("should hande TREECELLSCAPE_FETCH_ALL_TREE_NODES_SUCCESS", () => {
    expect(
      indexToID(initialIndexToID, fetchAllTreeNodesSuccess([NODE1, NODE2]))
    ).toEqual({
      [NODE_INDEX1]: NODE_ID1,
      [NODE_INDEX2]: NODE_ID2
    });
  });

  it("should handle TREECELLSCAPE_FETCH_TREE_NODES_SUCCESS", () => {
    expect(
      indexToID(
        initialIndexToID,
        fetchTreeNodesSuccess([NODE1, NODE2], [NODE_ID1, NODE_ID2])
      )
    ).toEqual({
      [NODE_INDEX1]: NODE_ID1,
      [NODE_INDEX2]: NODE_ID2
    });
  });

  it("should handle TREECELLSCAPE_FETCH_INDEX_ID_MAPPINGS_SUCCESS", () => {
    expect(
      indexToID(initialIndexToID, fetchIndexToIDMappingsSuccess([NODE1, NODE2]))
    ).toEqual({
      [NODE_INDEX1]: NODE_ID1,
      [NODE_INDEX2]: NODE_ID2
    });
  });

  it("should handle unrelated actions", () => {
    expect(indexToID(initialIndexToID, { type: "UNKNOWN" })).toEqual(
      initialIndexToID
    );
  });
});

/**
 * Cells
 */
describe("tree cellscape: data/cells reducer", () => {
  const initialState = reducer(undefined, {});
  it("initial state should have indexToID field", () => {
    expect(initialState.hasOwnProperty("indexToID")).toEqual(true);
  });

  it("initial state should have tree field", () => {
    expect(initialState.hasOwnProperty("tree")).toEqual(true);
  });

  it("initial state should have segs field", () => {
    expect(initialState.hasOwnProperty("segs")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      indexToID: indexToID(initialState["indexToID"], action),
      tree: tree(initialState["tree"], action),
      segs: segs(initialState["segs"], action)
    });
  });
});
