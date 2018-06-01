import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = "http://localhost:4000";

const client = new ApolloClient({
  uri: httpLink,
  cache: new InMemoryCache()
});

export default client;
