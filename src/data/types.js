import cellsTypes from "./cells/types.js";
import chromosomesTypes from "./chromosomes/types.js";
import analysisTypes from "./analysis/types.js";

const types = {
  ...cellsTypes,
  ...chromosomesTypes,
  ...analysisTypes
};

export default types;
