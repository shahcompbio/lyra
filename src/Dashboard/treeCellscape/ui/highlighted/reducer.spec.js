import reducer, { index, range, element } from "./reducer.js";
import { highlightElement, unhighlightElement } from "./actions.js";

const ROW = {
  index: 10,
  element: "row"
};

const CLUSTER = {
  range: [5, 20],
  element: "cluster"
};

const CLADE = {
  index: 10,
  range: [5, 20],
  element: "clade"
};

/**
 * Index
 */
const initialIndex = null;
describe("tree cellscape: ui/highlighted index reducer", () => {
  it("should return initial state", () => {
    expect(index(undefined, {})).toEqual(initialIndex);
  });

  it("should handle HIGHLIGHT_ELEMENT for row", () => {
    expect(index(initialIndex, highlightElement(ROW))).toEqual(ROW.index);
  });

  it("should handle HIGHLIGHT_ELEMENT for cluster", () => {
    expect(index(initialIndex, highlightElement(CLUSTER))).toEqual(null);
  });

  it("should handle HIGHLIGHT_ELEMENT for clade", () => {
    expect(index(initialIndex, highlightElement(CLADE))).toEqual(CLADE.index);
  });

  it("should handle UNHIGHLIGHT_ELEMENT", () => {
    expect(index(20, unhighlightElement())).toEqual(initialIndex);
  });

  it("should handle unrelated actions", () => {
    expect(index(initialIndex, { type: "UNKNOWN" })).toEqual(initialIndex);
  });
});

/**
 * Range
 */
const initialRange = null;
describe("tree cellscape: ui/highlighted range reducer", () => {
  it("should return initial state", () => {
    expect(range(undefined, {})).toEqual(initialRange);
  });

  it("should handle HIGHLIGHT_ELEMENT for row", () => {
    expect(range(initialRange, highlightElement(ROW))).toEqual(null);
  });

  it("should handle HIGHLIGHT_ELEMENT for cluster", () => {
    expect(range(initialRange, highlightElement(CLUSTER))).toEqual(
      CLUSTER.range
    );
  });

  it("should handle HIGHLIGHT_ELEMENT for clade", () => {
    expect(range(initialRange, highlightElement(CLADE))).toEqual(CLADE.range);
  });

  it("should handle UNHIGHLIGHT_ELEMENT", () => {
    expect(range([20, 25], unhighlightElement())).toEqual(initialRange);
  });

  it("should handle unrelated actions", () => {
    expect(range(initialRange, { type: "UNKNOWN" })).toEqual(initialRange);
  });
});

/**
 * Element
 */
const initialElement = null;
describe("tree cellscape: ui/highlighted element reducer", () => {
  it("should return initial state", () => {
    expect(element(undefined, {})).toEqual(initialElement);
  });

  it("should handle HIGHLIGHT_ELEMENT for row", () => {
    expect(element(initialElement, highlightElement(ROW))).toEqual(ROW.element);
  });

  it("should handle HIGHLIGHT_ELEMENT for cluster", () => {
    expect(element(initialElement, highlightElement(CLUSTER))).toEqual(
      CLUSTER.element
    );
  });

  it("should handle HIGHLIGHT_ELEMENT for clade", () => {
    expect(element(initialElement, highlightElement(CLADE))).toEqual(
      CLADE.element
    );
  });

  it("should handle UNHIGHLIGHT_ELEMENT", () => {
    expect(element("row", unhighlightElement())).toEqual(initialElement);
  });

  it("should handle unrelated actions", () => {
    expect(element(initialElement, { type: "UNKNOWN" })).toEqual(
      initialElement
    );
  });
});

/**
 * Highlighted
 */

export const initialState = {
  index: initialIndex,
  range: initialRange,
  element: initialElement
};
describe("tree cellscape: highlighted reducer", () => {
  it("initial state has index field", () => {
    expect(reducer(undefined, {}).hasOwnProperty("index")).toEqual(true);
  });

  it("initial state has range field", () => {
    expect(reducer(undefined, {}).hasOwnProperty("range")).toEqual(true);
  });

  it("initial state has element field", () => {
    expect(reducer(undefined, {}).hasOwnProperty("element")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      index: index(initialIndex, action),
      range: range(initialRange, action),
      element: element(initialElement, action)
    });
  });
});
