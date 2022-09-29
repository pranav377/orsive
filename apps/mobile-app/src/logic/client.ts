import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GRAPHQL_URL } from "./config";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import getItem from "./SecureStore/getItem";

const authLink = setContext(async (_, { headers }) => {
  let token = await getItem("token");

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
