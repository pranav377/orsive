import { ReadStream } from "fs-capacitor";
import BaseStorage from "..";
import { createS3Client } from "./client";
import { getMimeType } from "stream-mime-type";

const bucketParams = {
  ACL: "public-read",
};

class S3FileStorage extends BaseStorage {
  constructor(accessKeyId: string, secretAccessKey: string, Bucket: string) {
    super();
    this.options.client = createS3Client(accessKeyId, secretAccessKey);
    this.options.Bucket = Bucket;
  }

  async create(fileRelativePath: string, content: any, mime: string) {
    this.options.client
      .upload({
        ...bucketParams,
        Key: fileRelativePath,
        Body: content,
        ContentType: mime,
        Bucket: this.options.Bucket,
      })
      .send();

    return fileRelativePath;
  }

  async save(createReadStream: ReadStream, fileRelativePath: string) {
    const { stream, mime } = await getMimeType(createReadStream);

    this.options.client
      .upload({
        ...bucketParams,
        Key: fileRelativePath,
        Body: stream,
        ContentType: mime,
        Bucket: this.options.Bucket,
      })
      .send();

    return fileRelativePath;
  }
}

export default S3FileStorage;
