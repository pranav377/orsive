import AWS from "aws-sdk";

export function createS3Client(accessKeyId: string, secretAccessKey: string) {
  return new AWS.S3({
    endpoint: "https://nyc3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}
