import reducer, {
  initialIsPloidyNormalized,
  isPloidyNormalized,
  initialIsDiffsModeOn,
  isDiffsModeOn
} from "./reducer.js";

import { switchNormalizePloidy, switchDiffsByMode } from "./actions.js";

/**
 * isPloidyNormalized
 */

describe("tree cellscape: isPloidyNormalized reducer", () => {
  it("should return initial state", () => {
    expect(isPloidyNormalized(undefined, {})).toEqual(
      initialIsPloidyNormalized
    );
  });

  it("should handle SWITCH_NORMALIZE_PLOIDY when on", () => {
    expect(isPloidyNormalized(true, switchNormalizePloidy())).toEqual(false);
  });

  it("should handle SWITCH_NORMALIZE_PLOIDY when off", () => {
    expect(isPloidyNormalized(false, switchNormalizePloidy())).toEqual(true);
  });
  it("should handle unrelated actions", () => {
    expect(
      isPloidyNormalized(initialIsPloidyNormalized, { type: "UNKNOWN" })
    ).toEqual(initialIsPloidyNormalized);
  });
});

/**
 * isDiffsModeOn
 */

describe("tree cellscape: isDiffsModeOn reducer", () => {
  it("should return initial state", () => {
    expect(isDiffsModeOn(undefined, {})).toEqual(initialIsDiffsModeOn);
  });

  it("should handle SWITCH_DIFFS_MODE when on", () => {
    expect(isDiffsModeOn(true, switchDiffsByMode())).toEqual(false);
  });

  it("should handle SWITCH_DIFFS_MODE when off", () => {
    expect(isDiffsModeOn(false, switchDiffsByMode())).toEqual(true);
  });
  it("should handle unrelated actions", () => {
    expect(isDiffsModeOn(initialIsDiffsModeOn, { type: "UNKNOWN" })).toEqual(
      initialIsDiffsModeOn
    );
  });
});

/**
 * Menu
 */
describe("tree cellscape: ui/menu reducer", () => {
  const initialState = reducer(undefined, {});
  it("initial state has isPloidyNormalized field", () => {
    expect(initialState.hasOwnProperty("isPloidyNormalized")).toEqual(true);
  });

  it("initial state has isDiffsModeOn field", () => {
    expect(initialState.hasOwnProperty("isDiffsModeOn")).toEqual(true);
  });

  it("passes actions to child reducers", () => {
    const action = { type: "ACTION_TYPE" };
    expect(reducer(initialState, action)).toEqual({
      isPloidyNormalized: isPloidyNormalized(
        initialState["isPloidyNormalized"],
        action
      ),
      isDiffsModeOn: isDiffsModeOn(initialState["isDiffsModeOn"], action)
    });
  });
});
