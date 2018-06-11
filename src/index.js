import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store.js";
import "bootstrap/dist/css/bootstrap.css";

import { ApolloProvider } from "react-apollo";
import client from "./apollo.js";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
