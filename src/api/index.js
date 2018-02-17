import config from './config.js'



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