import child_process from "child_process";
import { MongoClient } from "mongodb";
import os from "os";
import axios from "axios";
import axiosRetry from "axios-retry";
import fs from "fs";
import { ConnectionString } from "mongo-connection-string";
import readline from "readline";
import chalk from "chalk";
import crypto from "crypto";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const printL = (line) => console.log(chalk.blue(`\n${line}\n`));
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const MEILISEARCH_URL = "http://localhost:7700";
const DEFAULT_SEARCH_MASTER_KEY = "1234";
let SEARCH_KEY = "";
let MONGODB_BASE_URI = "";
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
  // setting up env files
  await setupEnvVariables();
  // setting up api
  await setupAPI();

  printL("Setup Complete");

  process.exit(0);
}

async function init() {
  printL("Installing basic packages. This will take some time...");
  await sh("cd apps/api && npm install");
  await sh("cd apps/web && npm install");
  await sh("cd packages/belly && npm install");
  printL("Packages installed!");

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

  MONGODB_BASE_URI = await prompt(
    "Enter MongoDB connection string (eg: mongodb+srv://sample-hostname:27017/): "
  );

  let client = new MongoClient(MONGODB_BASE_URI);
  await client.connect();
  await client.db("orsive").createCollection("Profile");
  printL("Connection successful!");
}

async function installMeilisearch() {
  printL("Installing Meilisearch...");
  const meilisearchDir = "meilisearch";
  const isWin = os.platform() === "win32";
  fs.mkdirSync(meilisearchDir);
  await sh(`cd ${meilisearchDir} && eget meilisearch/Meilisearch`);
  const oldFile = fs.readdirSync(meilisearchDir)[0];

  printL("Meilisearch Installed!");

  fs.renameSync(
    `${meilisearchDir}/${oldFile}`,
    `${meilisearchDir}/meilisearch${isWin ? ".exe" : ""}`
  );

  printL("Starting Meilisearch instance");
  let meilisearchInstance = child_process.exec(
    `cd meilisearch && meilisearch --master-key ${DEFAULT_SEARCH_MASTER_KEY}`
  );

  meilisearchInstance.on("spawn", () => {
    SEARCH_CLIENT.post("/indexes", {
      uid: "all",
      primaryKey: "id",
    }).then(() => {
      printL("Search Index Created");

      SEARCH_CLIENT.post("/keys", {
        description: "Search key",
        actions: ["search", "indexes.get", "version"],
        indexes: ["all"],
        expiresAt: null,
      }).then((res) => {
        printL("Search key generated");
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
          printL("Configured search settings");
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
  printL("Installing Gorse...");
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
  printL("Gorse installed!");

  let recommenderDataStore = new ConnectionString(MONGODB_BASE_URI);
  let recommenderCacheStore = new ConnectionString(MONGODB_BASE_URI);
  recommenderDataStore.database = "recommendations";
  recommenderCacheStore.database = "recommendations-cache";

  recommenderDataStore = recommenderDataStore.toURI();
  recommenderCacheStore = recommenderCacheStore.toURI();

  fs.writeFileSync(
    `${gorseDir}/config.toml`,
    `
[database]

cache_store = "${recommenderDataStore}"
data_store = "${recommenderCacheStore}"

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

async function setupEnvVariables() {
  let orsiveDatabase = new ConnectionString(MONGODB_BASE_URI);
  orsiveDatabase.database = "orsive";

  orsiveDatabase = orsiveDatabase.toURI();
  let jwtSecret = crypto.randomBytes(96).toString("hex");
  let nextJsRevalidateKey = crypto.randomBytes(10).toString("hex");

  fs.writeFileSync(
    "apps/api/.env.development",
    `
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#using-environment-variables

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server and MongoDB (Preview).
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="${orsiveDatabase}"

FILE_UPLOADS_URL="http://localhost:4000/uploads/"

# Get your Sendinblue API key here: https://help.sendinblue.com/hc/en-us/articles/209467485-What-s-an-API-key-and-how-can-I-get-mine-
EMAIL_API_KEY=""
JWT_SECRET="${jwtSecret}"
GORSE_URL="http://localhost:8088/api"
NEXTJS_REVALIDATE_KEY="${nextJsRevalidateKey}"
NEXTJS_API_URL="http://localhost:3000/api"
MEILISEARCH_URL="http://127.0.0.1:7700"
MEILISEARCH_MASTER_KEY="${DEFAULT_SEARCH_MASTER_KEY}"

# Get client_id and client_secret: https://discord.com/developers/docs/topics/oauth2
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
DISCORD_CALLBACK_URL="http://localhost:4000/auth/discord/callback"

# Create an application here: https://console.developers.google.com/ , then get client_id and client_secret
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_CALLBACK_URL="http://localhost:4000/auth/google/callback"

OAUTH_SUCCESS_REDIRECT_URL="http://localhost:3000/feed"
`
  );

  fs.writeFileSync(
    "apps/web/.env.development.local",
    `
NEXT_PUBLIC_API_URL="http://localhost:4000"
REVALIDATE_KEY="${nextJsRevalidateKey}"
NEXT_PUBLIC_MEILISEARCH_URL="http://127.0.0.1:7700"
NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY="${SEARCH_KEY}"

# TinyMCE API key: https://www.tiny.cloud/auth/signup/
NEXT_PUBLIC_TINY_API_KEY=""
NEXT_PUBLIC_SITE_URL="https://www.orsive.com"

# Google analytics code, get by signing up for google analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=""  
  `
  );
}

async function setupAPI() {
  printL("Setting Up API");
  await sh("cd apps/api && npm run generate");

  printL("Creating Test Users");
  await sh("cd apps/api && npm run test-users");
}

main();
