const child_process = require("child_process");
const os = require("os");
const axios = require("axios").default;
const axiosRetry = require("axios-retry");
const fs = require("fs");

const MEILISEARCH_URL = "http://localhost:7700";
const DEFAULT_SEARCH_MASTER_KEY = "1234";
let SEARCH_KEY = "";
const SEARCH_CLIENT = axios.create({
  baseURL: MEILISEARCH_URL,
  headers: {
    Authorization: `Bearer ${DEFAULT_SEARCH_MASTER_KEY}`,
  },
});
axiosRetry(SEARCH_CLIENT, {
  retries: 7,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: () => true,
});

async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    child_process.exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function main() {
  // basic installation
  await init();
  // installing meilisearch
  await installMeilisearch();
  // installing gorse
  await installGorse();
}

async function init() {
  await sh("cd apps/api && npm install");
  await sh("cd apps/web && npm install");
  await sh("cd packages/belly && npm install");
  // create directory for handling file uploads in development
  const baseDir = "apps/api/uploads-dev";
  const dirs = [
    `${baseDir}/avatars`,
    `${baseDir}/banners`,
    `${baseDir}/content-images`,
    `${baseDir}/images`,
    `${baseDir}/orsic-thumbnails`,
  ];
  dirs.map((dir) => fs.mkdirSync(dir, { recursive: true }));
}

async function installMeilisearch() {
  const meilisearchDir = "meilisearch";
  const isWin = os.platform() === "win32";
  fs.mkdirSync(meilisearchDir);
  await sh(`cd ${meilisearchDir} && eget meilisearch/Meilisearch`);
  const oldFile = fs.readdirSync(meilisearchDir)[0];

  fs.renameSync(
    `${meilisearchDir}/${oldFile}`,
    `${meilisearchDir}/meilisearch${isWin ? ".exe" : ""}`
  );

  let meilisearchInstance = child_process.exec(
    `cd meilisearch && meilisearch --master-key ${DEFAULT_SEARCH_MASTER_KEY}`
  );

  meilisearchInstance.on("spawn", () => {
    SEARCH_CLIENT.post("/indexes", {
      uid: "all",
      primaryKey: "id",
    }).then(() => {
      console.log("Search Index Created");

      SEARCH_CLIENT.post("/keys", {
        description: "Search key",
        actions: ["search", "indexes.get", "version"],
        indexes: ["all"],
        expiresAt: null,
      }).then((res) => {
        console.log("Search key generated");
        let data = res.data;
        SEARCH_KEY = data.key;

        SEARCH_CLIENT.post("/indexes/all/settings/", {
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
        }).then(() => {
          console.log("Configured search settings");
          child_process.spawn("taskkill", [
            "/pid",
            meilisearchInstance.pid,
            "/f",
            "/t",
          ]);
        });
      });
    });
  });
}

async function installGorse() {
  const gorseDir = "gorse";
  const isWin = os.platform() === "win32";
  fs.mkdirSync(gorseDir);
  await sh(`cd ${gorseDir} && eget gorse-io/gorse --all`);
  const oldFiles = fs
    .readdirSync(gorseDir)
    .map((oldFile) => `${gorseDir}/${oldFile}`);

  oldFiles.map((oldFile) => {
    if (oldFile.includes("gorse-master")) {
      fs.renameSync(oldFile, `${gorseDir}/gorse-master${isWin ? ".exe" : ""}`);
    } else if (oldFile.includes("gorse-server")) {
      fs.renameSync(oldFile, `${gorseDir}/gorse-server${isWin ? ".exe" : ""}`);
    } else {
      fs.renameSync(oldFile, `${gorseDir}/gorse-worker${isWin ? ".exe" : ""}`);
    }
  });

  fs.writeFileSync(
    `${gorseDir}/config.toml`,
    `
[database]

cache_store = "mongodb+srv://user:password@cluster0.iqods.mongodb.net/recommendations-cache?retryWrites=true&w=majority"
data_store = "mongodb+srv://user:password@cluster0.iqods.mongodb.net/recommendations?retryWrites=true&w=majority"
  
[recommend.data_source]
  
positive_feedback_types = ["like"]
read_feedback_types = ["view"]
  
[recommend.replacement]
  
enable_replacement = true
  
[recommend.offline]
refresh_recommend_period = "1h"
  
enable_latest_recommend = true
  
enable_popular_recommend = true
  
enable_user_based_recommend = true
  
enable_item_based_recommend = true
  
enable_collaborative_recommend = true
  
enable_click_through_prediction = true
  
explore_recommend = { popular = 0.1, latest = 0.2 }
  
[recommend.online]
  
num_feedback_fallback_item_based = 100
  
[recommend.popular]
popular_window = 1
  `
  );
}

main();
