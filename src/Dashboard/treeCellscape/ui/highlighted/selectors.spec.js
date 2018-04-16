import {
  makeIsIndexHighlighted,
  makeIsIndexRangeHighlighted,
  isClade,
  isCluster,
  isRow
} from "./selectors.js";

describe("Tree Cellscape: highlighted selectors", () => {
  describe("makeIsIndexHighlighted", () => {
    const isIndexHighlighted1 = makeIsIndexHighlighted();
    const isIndexHighlighted2 = makeIsIndexHighlighted();

    it("should return whether given index is selected", () => {
      const selected = isIndexHighlighted1.resultFunc("clade", 10, [5, 20], 7);
      expect(selected).toEqual(true);
    });
  });
});
