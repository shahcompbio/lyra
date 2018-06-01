import reducer, {
  initialPath,
  path,
  initialRanges,
  ranges
} from "./reducer.js";
import { setTreeRoot, unsetTreeRoot } from "./actions.js";

const NODE_ID1 = "TEST1";
const NODE_ID2 = "TEST2";
/**
 * Tree Path
 */
describe("tree cellscape: root path reducer", () => {
  it("should return initial state", () => {
    expect(path(undefined, {})).toEqual(initialPath);
  });

  it("should handle TREECELLSCAPE_SET_TREE_ROOT", () => {
    expect(path(initialPath, setTreeRoot(NODE_ID1, 205, 350))).toEqual([
      NODE_ID1
    ]);
  });

  it("should handle TREECELLSCAPE_UNSET_TREE_ROOT with only one element", () => {
    expect(path([NODE_ID1], unsetTreeRoot())).toEqual([NODE_ID1]);
  });

  it("should handle TREECELLSCAPE_UNSET_TREE_ROOT with multiple elements", () => {
    expect(path([NODE_ID1, NODE_ID2], unsetTreeRoot())).toEqual([NODE_ID2]);
  });

  it("should handle unrelated actions", () => {
    expect(path(initialPath, { type: "UNKNOWN" })).toEqual(initialPath);
  });
});

/**
 * Tree Path
 */
describe("tree cellscape: root ranges reducer", () => {
  it("should return initial state", () => {
    expect(ranges(undefined, {})).toEqual(initialRanges);
  });

  it("should handle TREECELLSCAPE_SET_TREE_ROOT", () => {
    expect(ranges(initialRanges, setTreeRoot(NODE_ID1, 205, 350))).toEqual([
      [205, 350]
    ]);
  });

  it("should handle TREECELLSCAPE_UNSET_TREE_ROOT with only one element", () => {
    expect(ranges([[205, 350]], unsetTreeRoot())).toEqual([[205, 350]]);
  });

  it("should handle TREECELLSCAPE_UNSET_TREE_ROOT with multiple elements", () => {
    expect(ranges([[240, 300], [205, 350]], unsetTreeRoot())).toEqual([
      [205, 350]
    ]);
  });

  it("should handle unrelated actions", () => {
    expect(ranges(initialRanges, { type: "UNKNOWN" })).toEqual(initialRanges);
  });
});

/**
 * Root
 */

describe("tree cellscape: root reducer", () => {
  const initialState = reducer(undefined, {});
  it("initial state has path field", () => {
    expect(initialState.hasOwnProperty("path")).toEqual(true);
  });

  it("initial state has ranges field", () => {
    expect(initialState.hasOwnProperty("ranges")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      path: path(initialState["path"], action),
      ranges: ranges(initialState["ranges"], action)
    });
  });
});
