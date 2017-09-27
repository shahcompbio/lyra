/**
* General Elasticsearch utils
*/

const config = {
	HOST: "http://localhost:9200/",
	INDEX: "a90648a_denormalized", // For testing
	SEARCH: "/_search"
}


export function fetchQuery(query) {
	return fetch(config.HOST + config.INDEX + config.SEARCH, {
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