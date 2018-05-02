import reducer from "./reducer.js";
import { fetchChromRanges, fetchChromRangesSuccess } from "./actions.js";
import data from "utils/testData.js";

describe("tree cellscape: data/chromosomes reducer", () => {
  const initialState = {
    data: {},
    order: []
  };

  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle TREECELLSCAPE_FETCH_CHROM_RANGES_SUCCESS", () => {
    expect(
      reducer(initialState, fetchChromRangesSuccess(data.testChromosomes))
    ).toEqual({
      data: data.testChromDataObj,
      order: data.testChromList
    });
  });

  it("should handle unrelated actions", () => {
    expect(reducer(initialState, { type: "UNKNOWN" })).toEqual(initialState);
  });
});
