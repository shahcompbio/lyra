import highlightedTypes from "./highlighted/types.js";

const types = {
  ...highlightedTypes,

  /** set new tree root */
  setTreeRoot: "TREECELLSCAPE_SET_TREE_ROOT",
  unsetTreeRoot: "TREECELLSCAPE_UNSET_TREE_ROOT"
};

export default types;
