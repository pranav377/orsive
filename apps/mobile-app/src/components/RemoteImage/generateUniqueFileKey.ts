import slugify from "slugify";

export default function generateUniqueFileKey(
  remoteUri: string,
  filename = false
) {
  const uniqueKey = slugify(remoteUri, {
    strict: true,
  });

  if (filename) {
    let filename = remoteUri.substring(remoteUri.lastIndexOf("/") + 1);

    return `${uniqueKey}-${filename}`;
  } else {
    return uniqueKey;
  }
}
