import MeiliSearch from "meilisearch";
import { client } from "../../pages/_app";
import { GET_SEARCH_KEY_QUERY } from "./getSearchKeyQuery";

export default async function getSearchIndex() {
  let SearchKey = (await client.query({ query: GET_SEARCH_KEY_QUERY })).data
    .getSearchKey;

  let meilisearchClient = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MEILISEARCH_URL!,
    apiKey: SearchKey,
  });

  return meilisearchClient.getIndex("all");
}
