import reducer, {
  initialPending,
  pending,
  initialData,
  data
} from "./reducer.js";
import { fetchSegs, fetchSegsSuccess } from "./actions.js";

import {
  NODE_ID1,
  NODE1_SEG1,
  NODE1_SEG2,
  NODE_ID2,
  NODE2_SEG1,
  NODE2_SEG2
} from "../../../mock/segs.js";

const SEGS = [NODE1_SEG1, NODE1_SEG2, NODE2_SEG1, NODE2_SEG2];

/**
 * Pending
 */
describe("tree cellscape: data/cells/segs pending reducer", () => {
  it("should return initial state", () => {
    expect(pending(undefined, {})).toEqual(initialPending);
  });

  it("should handle TREECELLSCAPE_FETCH_SEGMENTS", () => {
    expect(pending(initialPending, fetchSegs([NODE_ID1]))).toEqual([NODE_ID1]);
  });

  it("should handle TREECELLSCAPE_FETCH_SEGMENTS with existing IDs", () => {
    expect(pending([NODE_ID1], fetchSegs([NODE_ID1, NODE_ID2]))).toEqual([
      NODE_ID1,
      NODE_ID2
    ]);
  });

  it("should handle TREECELLSCAPE_FETCH_SEGMENTS_SUCCESS", () => {
    expect(
      pending(
        [NODE_ID1, NODE_ID2],
        fetchSegsSuccess(SEGS, [NODE_ID1, NODE_ID2])
      )
    ).toEqual([]);
  });

  it("should handle unrelated actions", () => {
    expect(pending(initialPending, { type: "UNKNOWN" })).toEqual(
      initialPending
    );
  });
});

/**
 * Data
 */
describe("tree cellscape: data/cells/segs data reducer", () => {
  it("should return initial state", () => {
    expect(data(undefined, {})).toEqual(initialData);
  });

  it("should handle TREECELLSCAPE_FETCH_SEGMENTS_SUCCESS", () => {
    expect(
      data(initialData, fetchSegsSuccess(SEGS, [NODE_ID1, NODE_ID2]))
    ).toEqual({
      [NODE_ID1]: [NODE1_SEG1, NODE1_SEG2],
      [NODE_ID2]: [NODE2_SEG1, NODE2_SEG2]
    });
  });

  it("should handle unrelated actions", () => {
    expect(data(initialData, { type: "UNKNOWN" })).toEqual(initialData);
  });
});

/**
 * Segs
 */

describe("tree cellscape: data/cells/segs reducer", () => {
  const initialState = reducer(undefined, {});
  it("initial state has pending field", () => {
    expect(initialState.hasOwnProperty("pending")).toEqual(true);
  });

  it("initial state has data field", () => {
    expect(initialState.hasOwnProperty("data")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      data: data(initialState["data"], action),
      pending: pending(initialState["pending"], action)
    });
  });
});
