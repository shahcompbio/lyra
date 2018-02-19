/**
* General Elasticsearch utils
*/

const config = {
	HOST: "http://localhost:9201/",
	INDEX: "htert_sc763_tree",
	//INDEX: "htert_tree", // For testing
	//INDEX: "tree_test",
	SEARCH: "/_search"
}


export function fetchQuery(query, index) {
	return fetch(config.HOST + index + config.SEARCH, {
		    method: "POST",
		    body: JSON.stringify(query),
		    headers: {
		    "Content-Type": "application/json"
		  }
  		}
  	).then(response => response.json(),
  			error => console.log("An error occured.", error)
  	)
}