import { UserInputError } from "apollo-server-express";
import { FileUpload } from "graphql-upload";

export default async function IsImageFileValid(file: FileUpload) {
  const { mimetype } = await file;

  if (!mimetype.includes("image")) {
    throw new UserInputError("File is not an image!");
  }
}
