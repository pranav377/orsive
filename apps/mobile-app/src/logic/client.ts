import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPHQL_URL } from "./config";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const authLink = setContext((_, { headers }) => {
  let token = null;

  if (typeof window !== "undefined" && window.localStorage) {
    token = localStorage.getItem("token");
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(
    createUploadLink({
      uri: GRAPHQL_URL,
    })
  ),
});
