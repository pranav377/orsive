import { FileUpload } from "graphql-upload";
import generateFilename from "../../utils/files/generateFilename";
import IsImageFileValid from "../../utils/files/isImageFileValid";
import saveFile from "../../utils/files/saveFile";

export interface EditorImageUploadArgs {
  file: FileUpload;
}

export async function EditorImageUpload(args: EditorImageUploadArgs) {
  const imageData = await args.file;

  await IsImageFileValid(imageData);

  let file = await saveFile(
    `content-images/${generateFilename(imageData.filename)}`,
    imageData
  );

  return { file };
}
