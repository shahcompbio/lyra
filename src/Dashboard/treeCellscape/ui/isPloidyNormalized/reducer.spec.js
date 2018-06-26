import isPloidyNormalized, { initialIsPloidyNormalized } from "./reducer.js";

import { switchNormalizePloidy } from "./actions.js";

describe("tree cellscape: ui/isPloidyNormalized reducer", () => {
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
