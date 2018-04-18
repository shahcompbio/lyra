import { fetchFromAnalysis } from "api/index.js";
import { processRecord } from "api/utils.js";

const MAPPINGS = {
  analysis_id: "id",
  segs_index: "segsIndex",
  tree_index: "treeIndex",
  description: "description",
  title: "title",
  dashboard: "dashboard"
};

export function fetchAllAnalysis() {
  return fetchFromAnalysis(allAnalysisQuery()).then(json =>
    parseAnalysis(json)
  );
}

const allAnalysisQuery = () => ({
  size: 50000
});

const parseAnalysis = json =>
  json.hits.hits.map(record =>
    processRecord(record["_source"], MAPPINGS, false)
  );
