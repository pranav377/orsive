import MeiliSearch from "meilisearch";

const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_URL!,
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY,
});

export const searchIndex = client.getIndex("all");
