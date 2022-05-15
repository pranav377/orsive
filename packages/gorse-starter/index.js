const child_process = require("child_process");

console.log("Starting Gorse...");

let gorseMasterInstance = child_process.exec(
  `cd .. && cd .. && cd gorse && gorse-master -c ./config.toml`
);

let gorseServerInstance = child_process.exec(
  `cd .. && cd .. && cd gorse && gorse-server --master-host 127.0.0.1 --master-port 8086 --http-host 127.0.0.1 --http-port 8087`
);

let gorseWorkerInstance = child_process.exec(
  `cd .. && cd .. && cd gorse && gorse-worker --master-host 127.0.0.1 --master-port 8086 --http-host 127.0.0.1 --http-port 8089 -j 4`
);

gorseMasterInstance.on("spawn", () => {
  console.log("Gorse Master started at: localhost:8088");
});

gorseServerInstance.on("spawn", () => {
  console.log("Gorse Server has started.");
});

gorseWorkerInstance.on("spawn", () => {
  console.log("Gorse Worker has started.");
});

process.on("exit", function () {
  child_process.spawn("taskkill", [
    "/pid",
    gorseMasterInstance.pid,
    "/f",
    "/t",
  ]);
  child_process.spawn("taskkill", [
    "/pid",
    gorseServerInstance.pid,
    "/f",
    "/t",
  ]);
  child_process.spawn("taskkill", [
    "/pid",
    gorseWorkerInstance.pid,
    "/f",
    "/t",
  ]);
});
