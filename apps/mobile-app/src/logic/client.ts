import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPHQL_URL } from "./config";

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});
