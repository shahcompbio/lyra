import types from "./types.js";

export const selectAnalysis = analysis => ({
  type: types.selectAnalysis,
  id: analysis.id,
  title: analysis.title,
  treeIndex: analysis.treeIndex,
  segsIndex: analysis.segsIndex
});
