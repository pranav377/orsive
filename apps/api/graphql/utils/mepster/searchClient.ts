import { MeiliSearch } from "meilisearch";

export const searchClient = new MeiliSearch({
  host: process.env.MEILISEARCH_URL!,
  apiKey: process.env.MEILISEARCH_MASTER_KEY,
});

export const searchIndex = searchClient.index("all");
