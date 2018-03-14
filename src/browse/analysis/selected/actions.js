import types from "./types.js";

export const selectAnalysis = analysis => ({
  type: types.selectAnalysis,
  id: analysis.title,
  treeIndex: analysis.treeIndex,
  segsIndex: analysis.segsIndex
});
