/**
 * General Elasticsearch utils
 */

const config = {
  HOST: "",
  INDEX: "htert_sc763_tree",
  //INDEX: "htert_tree", // For testing
  //INDEX: "tree_test",
  SEARCH: "/_search"
};

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
