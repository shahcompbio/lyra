import selectedTypes from "./selected/types.js";

const types = {
  fetchAllAnalysis: "FETCH_ALL_ANALYSIS",
  fetchAllAnalysisSuccess: "FETCH_ALL_ANALYSIS_SUCCESS",
  ...selectedTypes
};

export default types;
