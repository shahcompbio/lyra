import reducer, { initialOrder, order, initialData, data } from "./reducer.js";
import { fetchChromRanges, fetchChromRangesSuccess } from "./actions.js";

import { CHROM1, CHROM2 } from "../../mock/chromosomes.js";

/**
 * Order
 */
describe("tree cellscape: data/chromosomes order reducer", () => {
  it("should return initial state", () => {
    expect(order(undefined, {})).toEqual(initialOrder);
  });

  it("should handle TREECELLSCAPE_FETCH_CHROM_RANGES_SUCCESS", () => {
    expect(
      order(initialOrder, fetchChromRangesSuccess([CHROM1, CHROM2]))
    ).toEqual(["01", "02"]);
  });

  it("should handle unrelated actions", () => {
    expect(order(initialOrder, { type: "UNKNOWN" })).toEqual(initialOrder);
  });
});

/**
 * Data
 */
describe("tree cellscape: data/chromosomes data reducer", () => {
  it("should return initial state", () => {
    expect(data(undefined, {})).toEqual(initialData);
  });

  it("should handle TREECELLSCAPE_FETCH_CHROM_RANGES_SUCCESS", () => {
    expect(
      data(initialData, fetchChromRangesSuccess([CHROM1, CHROM2]))
    ).toEqual({
      "01": CHROM1,
      "02": CHROM2
    });
  });

  it("should handle unrelated actions", () => {
    expect(data(initialData, { type: "UNKNOWN" })).toEqual(initialData);
  });
});

/**
 * Chromosomes
 */
describe("tree cellscape: data/chromosomes reducer", () => {
  const initialState = reducer(undefined, {});

  it("initial state has order field", () => {
    expect(initialState.hasOwnProperty("order")).toEqual(true);
  });

  it("initial state has data field", () => {
    expect(initialState.hasOwnProperty("data")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      order: order(initialState["order"], action),
      data: data(initialState["data"], action)
    });
  });
});
