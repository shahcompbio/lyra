import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

const httpLink = "http://localhost:4000";

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
