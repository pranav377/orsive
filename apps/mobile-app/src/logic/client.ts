import Constants from "expo-constants";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const { manifest } = Constants;
const api =
  typeof manifest?.packagerOpts === `object` &&
  manifest.packagerOpts.dev &&
  __DEV__
    ? `http://${manifest?.debuggerHost
        ?.split(`:`)
        ?.shift()
        ?.concat(`:4000`)}/graphql`
    : `https://api.orsive.com/graphql`;

export const client = new ApolloClient({
  uri: api,
  cache: new InMemoryCache(),
});
