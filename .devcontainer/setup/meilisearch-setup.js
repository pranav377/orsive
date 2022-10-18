const { default: MeiliSearch } = require("meilisearch");

const searchClient = new MeiliSearch({
  host: process.env.MEILISEARCH_URL || "http://localhost:7700",
  apiKey: process.env.MEILISEARCH_MASTER_KEY || "1234",
});

const SEARCH_KEY_UID = "e50180b9-5062-4cbc-8d6f-8ac2b49048dd";

async function setup() {
  try {
    await searchClient.getKey(SEARCH_KEY_UID);
    console.log("Setup already complete");
  } catch {
    console.log("Running setup");

    await searchClient.createIndex("all", {
      primaryKey: "id",
    });

    await searchClient.index("all").updateSettings({
      displayedAttributes: [
        "id",
        "username",
        "name",
        "joined",
        "type",
        "avatar",
        "_count",
        "image",
        "title",
        "slug",
        "post",
        "content",
        "truncated",
        "width",
        "height",
      ],
    });

    await searchClient.createKey({
      description: "Search key",
      actions: ["search", "indexes.get", "version"],
      indexes: ["all"],
      expiresAt: null,
      uid: SEARCH_KEY_UID,
    });

    console.log("Setup complete");
  }
}

setup();
