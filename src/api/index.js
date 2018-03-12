import config from "./config.js";

/**
 * Fetches appropriate index according to data type
 */
export function fetchForDataType(query, dataType) {
  const index =
    dataType === "analysis"
      ? config.ANALYSIS_INDEX
      : dataType === "tree" ? config.TREE_INDEX : config.SEG_INDEX;

  return fetchQuery(query, index);
}

export function fetchQuery(query, index) {
  return fetch(config.HOST + index + config.SEARCH, {
    method: "POST",
    body: JSON.stringify(query),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(
    response => response.json(),
    error => console.log("An error occured.", error)
  );
}
