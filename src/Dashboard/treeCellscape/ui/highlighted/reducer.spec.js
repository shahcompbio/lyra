import reducer from "./reducer.js";
import { highlightElement, unhighlightElement } from "./actions.js";

describe("tree cellscape: highlighted reducer", () => {
  const initialState = {
    index: null,
    range: null,
    element: null
  };

  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle HIGHLIGHT_ELEMENT for row", () => {
    expect(
      reducer(
        initialState,
        highlightElement({
          index: 10,
          range: null,
          element: "row"
        })
      )
    ).toEqual({
      index: 10,
      range: null,
      element: "row"
    });
  });

  it("should handle HIGHLIGHT_ELEMENT for cluster", () => {
    expect(
      reducer(
        initialState,
        highlightElement({
          index: null,
          range: [5, 20],
          element: "cluster"
        })
      )
    ).toEqual({
      index: null,
      range: [5, 20],
      element: "cluster"
    });
  });

  it("should handle HIGHLIGHT_ELEMENT for clade", () => {
    expect(
      reducer(
        initialState,
        highlightElement({
          index: 10,
          range: [5, 20],
          element: "clade"
        })
      )
    ).toEqual({
      index: 10,
      range: [5, 20],
      element: "clade"
    });
  });

  it("should handle UNHIGHLIGHT_ELEMENT", () => {
    expect(
      reducer(
        {
          index: 10,
          range: [5, 20],
          element: "clade"
        },
        unhighlightElement()
      )
    ).toEqual(initialState);
  });

  it("should handle unrelated actions", () => {
    expect(reducer(initialState, { type: "UNKNOWN" })).toEqual(initialState);
  });
});
