import { S3FileStorage, LocalFileStorage } from "../../packages/belly";
import path from "path";

let storage = new LocalFileStorage(path.join(__dirname, "uploads-dev"));

if (process.env.NODE_ENV === "production") {
  storage = new S3FileStorage(
    process.env.S3_ACCESS_KEY!,
    process.env.S3_SECRET_KEY!,
    process.env.S3_BUCKET_NAME!
  );
}

export default storage;
