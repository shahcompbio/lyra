import reducer from "./reducer.js";
import { highlightElement, unhighlightElement } from "./actions.js";
import data from "utils/testData.js";

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
          index: data.rowElement["index"],
          range: data.rowElement["range"],
          element: data.rowElement["element"]
        })
      )
    ).toEqual({
      index: data.rowElement["index"],
      range: data.rowElement["range"],
      element: data.rowElement["element"]
    });
  });

  it("should handle HIGHLIGHT_ELEMENT for cluster", () => {
    expect(
      reducer(
        initialState,
        highlightElement({
          index: data.clusterElement["index"],
          range: data.clusterElement["range"],
          element: data.clusterElement["element"]
        })
      )
    ).toEqual({
      index: data.clusterElement["index"],
      range: data.clusterElement["range"],
      element: data.clusterElement["element"]
    });
  });

  it("should handle HIGHLIGHT_ELEMENT for clade", () => {
    expect(
      reducer(
        initialState,
        highlightElement({
          index: data.cladeElement["index"],
          range: data.cladeElement["range"],
          element: data.cladeElement["element"]
        })
      )
    ).toEqual({
      index: data.cladeElement["index"],
      range: data.cladeElement["range"],
      element: data.cladeElement["element"]
    });
  });

  it("should handle UNHIGHLIGHT_ELEMENT", () => {
    expect(
      reducer(
        {
          index: data.cladeElement["index"],
          range: data.cladeElement["range"],
          element: data.cladeElement["element"]
        },
        unhighlightElement()
      )
    ).toEqual(initialState);
  });

  it("should handle unrelated actions", () => {
    expect(reducer(initialState, { type: "UNKNOWN" })).toEqual(initialState);
  });
});
