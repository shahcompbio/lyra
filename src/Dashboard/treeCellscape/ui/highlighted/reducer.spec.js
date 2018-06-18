import reducer, {
  initialIndex,
  index,
  initialRange,
  range,
  initialElement,
  element,
  initialChromosome,
  chromosome,
  initialID,
  id
} from "./reducer.js";
import {
  highlightElement,
  unhighlightElement,
  highlightChromosome
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
 * Chromosome
 */
describe("tree cellscape: ui/highlighted chromosome reducer", () => {
  it("should return initial state", () => {
    expect(chromosome(undefined, {})).toEqual(initialChromosome);
  });

  it("should handle HIGHLIGHT_CHROMOSOME", () => {
    expect(chromosome(initialChromosome, highlightChromosome("02"))).toEqual(
      "02"
    );
  });

  it("should handle UNHIGHLIGHT_ELEMENT", () => {
    expect(chromosome("02", unhighlightElement())).toEqual(initialChromosome);
  });

  it("should handle unrelated actions", () => {
    expect(chromosome(initialChromosome, { type: "UNKNOWN" })).toEqual(
      initialChromosome
    );
  });
});

/**
 * ID
 */
describe("tree cellscape: ui/highlighted id reducer", () => {
  it("should return initial state", () => {
    expect(id(undefined, {})).toEqual(initialID);
  });

  it("should handle HIGHLIGHT_ELEMENT for row", () => {
    expect(id(initialID, highlightElement(ROW))).toEqual(ROW.id);
  });

  it("should handle HIGHLIGHT_ELEMENT for cluster", () => {
    expect(id(initialID, highlightElement(CLUSTER))).toEqual(initialID);
  });

  it("should handle HIGHLIGHT_ELEMENT for clade", () => {
    expect(id(initialID, highlightElement(CLADE))).toEqual(initialID);
  });

  it("should handle UNHIGHLIGHT_ELEMENT", () => {
    expect(id("row", unhighlightElement())).toEqual(initialID);
  });

  it("should handle unrelated actions", () => {
    expect(id(initialID, { type: "UNKNOWN" })).toEqual(initialID);
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

  it("initial state has chromosome field", () => {
    expect(initialState.hasOwnProperty("chromosome")).toEqual(true);
  });

  it("initial state has ID field", () => {
    expect(initialState.hasOwnProperty("id")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      index: index(initialState["index"], action),
      range: range(initialState["range"], action),
      element: element(initialState["element"], action),
      chromosome: chromosome(initialState["chromosome"], action),
      id: id(initialState["id"], action)
    });
  });
});
