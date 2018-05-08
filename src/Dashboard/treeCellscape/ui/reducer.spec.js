import reducer, { treePath } from "./reducer.js";
import highlighted from "./highlighted/reducer.js";
import { initialState as highlightedInitialState } from "./highlighted/reducer.spec.js";
import { setTreeRoot, unsetTreeRoot } from "./actions.js";
import { fetchTreeRootSuccess } from "../data/actions.js";

// Tree Path
const treePathInitialState = [];
describe("tree cellscape: tree path reducer", () => {
  it("should return initial state", () => {
    expect(treePath(undefined, {})).toEqual(treePathInitialState);
  });

  it("should handle TREECELLSCAPE_FETCH_TREE_ROOT_SUCCESS", () => {
    expect(
      treePath(
        treePathInitialState,
        fetchTreeRootSuccess({ cellID: "TEST_ID" })
      )
    ).toEqual(["TEST_ID"]);
  });

  it("should handle TREECELLSCAPE_SET_TREE_ROOT", () => {
    expect(treePath(treePathInitialState, setTreeRoot("TEST_ID"))).toEqual([
      "TEST_ID"
    ]);
  });

  it("should handle TREECELLSCAPE_UNSET_TREE_ROOT with only one element", () => {
    expect(treePath(["TEST_ID"], unsetTreeRoot())).toEqual(["TEST_ID"]);
  });

  it("should handle TREECELLSCAPE_UNSET_TREE_ROOT with multiple elements", () => {
    expect(treePath(["TEST_ID1", "TEST_ID2"], unsetTreeRoot())).toEqual([
      "TEST_ID2"
    ]);
  });

  it("should handle unrelated actions", () => {
    expect(treePath(treePathInitialState, { type: "UNKNOWN" })).toEqual(
      treePathInitialState
    );
  });
});

// UI reducer
export const initialState = {
  highlighted: highlightedInitialState,
  treePath: treePathInitialState
};

describe("tree cellscape: ui reducer", () => {
  it("initial state has highlighted field", () => {
    expect(reducer(undefined, {}).hasOwnProperty("highlighted")).toEqual(true);
  });

  it("initial state has treePath field", () => {
    expect(reducer(undefined, {}).hasOwnProperty("treePath")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      highlighted: highlighted(highlightedInitialState, action),
      treePath: treePath(treePathInitialState, action)
    });
  });
});
