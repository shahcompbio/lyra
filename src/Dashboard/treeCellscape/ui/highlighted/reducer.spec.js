import reducer, {
  initialIndex,
  index,
  initialRange,
  range,
  initialElement,
  element,
  initialData,
  data,
  initialSegment,
  segment
} from "./reducer.js";
import {
  highlightElement,
  unhighlightElement,
  highlightSegment
} from "./actions.js";

const ROW = {
  index: 10,
  element: "row",
  id: "TEST_ID"
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
 * data
 */
describe("tree cellscape: ui/highlighted data reducer", () => {
  it("should return initial state", () => {
    expect(data(undefined, {})).toEqual(initialData);
  });

  it("should handle HIGHLIGHT_ELEMENT with data", () => {
    expect(data(initialData, highlightElement({ ...ROW, data: {} }))).toEqual(
      {}
    );
  });

  it("should handle HIGHLIGHT_ELEMENT without data", () => {
    expect(data(initialData, highlightElement(CLUSTER))).toEqual(initialData);
  });

  it("should handle UNHIGHLIGHT_ELEMENT", () => {
    expect(data({}, unhighlightElement())).toEqual(initialData);
  });

  it("should handle unrelated actions", () => {
    expect(data(initialData, { type: "UNKNOWN" })).toEqual(initialData);
  });
});

/**
 * segment
 */
describe("tree cellscape: ui/highlighted segment reducer", () => {
  it("should return initial state", () => {
    expect(segment(undefined, {})).toEqual(initialSegment);
  });

  it("should handle HIGHLIGHT_SEGMENT", () => {
    expect(segment(initialSegment, highlightSegment({}))).toEqual({});
  });

  it("should handle UNHIGHLIGHT_ELEMENT", () => {
    expect(segment({}, unhighlightElement())).toEqual(initialSegment);
  });

  it("should handle unrelated actions", () => {
    expect(segment(initialSegment, { type: "UNKNOWN" })).toEqual(
      initialSegment
    );
  });
});

/**
 * Highlighted
 */
describe("tree cellscape: highlighted reducer", () => {
  const initialState = reducer(undefined, {});
  it("initial state has index field", () => {
    expect(initialState.hasOwnProperty("index")).toEqual(true);
  });

  it("initial state has range field", () => {
    expect(initialState.hasOwnProperty("range")).toEqual(true);
  });

  it("initial state has element field", () => {
    expect(initialState.hasOwnProperty("element")).toEqual(true);
  });

  it("initial state has data field", () => {
    expect(initialState.hasOwnProperty("data")).toEqual(true);
  });

  it("initial state has segment field", () => {
    expect(initialState.hasOwnProperty("segment")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      index: index(initialState["index"], action),
      range: range(initialState["range"], action),
      element: element(initialState["element"], action),
      data: data(initialState["data"], action),
      segment: segment(initialState["segment"], action)
    });
  });
});
