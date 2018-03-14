import types from "./types.js";

export const selectAnalysis = analysis => ({
  type: types.selectAnalysis,
  id: "",
  treeIndex: analysis.treeIndex,
  segsIndex: analysis.segsIndex
});
