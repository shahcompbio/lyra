import segsTypes from "./segs/types.js";
import treeTypes from "./tree/types.js";

const types = {
  ...segsTypes,
  ...treeTypes,

  /** Fetch missing index to ID mappings */
  fetchIndexToIDMappings: "TREECELLSCAPE_FETCH_INDEX_ID_MAPPINGS",
  fetchIndexToIDMappingsSuccess: "TREECELLSCAPE_FETCH_INDEX_ID_MAPPINGS_SUCCESS"
};

export default types;
