import reducer, { initialTreePath, treePath } from "./reducer.js";
import highlighted from "./highlighted/reducer.js";
import { setTreeRoot, unsetTreeRoot } from "./actions.js";
import { fetchTreeRootSuccess } from "../data/actions.js";

import { NODE1, NODE_ID1, NODE_ID2 } from "../mock/nodes.js";

/**
 * Tree Path
 */
describe("tree cellscape: tree path reducer", () => {
  it("should return initial state", () => {
    expect(treePath(undefined, {})).toEqual(initialTreePath);
  });

  it("should handle TREECELLSCAPE_FETCH_TREE_ROOT_SUCCESS", () => {
    expect(treePath(initialTreePath, fetchTreeRootSuccess(NODE1))).toEqual([
      NODE_ID1
    ]);
  });

  it("should handle TREECELLSCAPE_SET_TREE_ROOT", () => {
    expect(treePath(initialTreePath, setTreeRoot(NODE_ID1))).toEqual([
      NODE_ID1
    ]);
  });

  it("should handle TREECELLSCAPE_UNSET_TREE_ROOT with only one element", () => {
    expect(treePath([NODE_ID1], unsetTreeRoot())).toEqual([NODE_ID1]);
  });

  it("should handle TREECELLSCAPE_UNSET_TREE_ROOT with multiple elements", () => {
    expect(treePath([NODE_ID1, NODE_ID2], unsetTreeRoot())).toEqual([NODE_ID2]);
  });

  it("should handle unrelated actions", () => {
    expect(treePath(initialTreePath, { type: "UNKNOWN" })).toEqual(
      initialTreePath
    );
  });
});

/**
 * UI
 */

describe("tree cellscape: ui reducer", () => {
  const initialState = reducer(undefined, {});
  it("initial state has highlighted field", () => {
    expect(initialState.hasOwnProperty("highlighted")).toEqual(true);
  });

  it("initial state has treePath field", () => {
    expect(initialState.hasOwnProperty("treePath")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      highlighted: highlighted(initialState["highlighted"], action),
      treePath: treePath(initialState["treePath"], action)
    });
  });
});
