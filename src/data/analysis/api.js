import { fetchForDataType } from "api/index.js";
import { processRecord } from "api/utils.js";

const MAPPINGS = {
  segs_index: "segsIndex",
  tree_index: "treeIndex",
  description: "description",
  title: "title"
};

export function fetchAllAnalysis() {
  return fetchForDataType(allAnalysisQuery(), "analysis").then(json =>
    parseAnalysis(json)
  );
}

const allAnalysisQuery = () => {
  size: 50000;
};

const parseAnalysis = json =>
  json.hits.hits.map(record =>
    processRecord(record["_source"], MAPPINGS, false)
  );
