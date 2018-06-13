import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

const httpLink = process.env.REACT_APP_GRAPHQL_URL || "/graphql";

const link = createHttpLink({
  uri: httpLink,
  credentials: "same-origin"
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  shouldBatch: true
});

export default client;
