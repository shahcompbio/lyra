import config from "./config.js";

/**
 * Fetches from analysis index
 */
export function fetchFromAnalysis(query) {
  return fetchQuery(query, config.ANALYSIS_INDEX);
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
