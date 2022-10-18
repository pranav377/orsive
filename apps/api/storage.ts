import { S3FileStorage, LocalFileStorage } from "../../packages/belly";
import path from "path";
import {
  NODE_ENV,
  S3_ACCESS_KEY,
  S3_BUCKET_NAME,
  S3_SECRET_KEY,
} from "./graphql/config";

let storage = new LocalFileStorage(path.join(__dirname, "uploads-dev"));

if (NODE_ENV === "production") {
  storage = new S3FileStorage(S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET_NAME);
}

export default storage;
