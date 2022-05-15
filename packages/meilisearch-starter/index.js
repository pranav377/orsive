const child_process = require("child_process");

console.log("Starting Meilisearch...");

let meilisearchInstance = child_process.exec(
  `cd .. && cd .. && cd meilisearch && meilisearch --master-key 1234`
);

meilisearchInstance.on("spawn", () => {
  console.log("Meilisearch has been started.");
});

process.on("exit", function () {
  child_process.spawn("taskkill", [
    "/pid",
    meilisearchInstance.pid,
    "/f",
    "/t",
  ]);
});
