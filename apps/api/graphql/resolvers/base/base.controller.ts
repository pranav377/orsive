import { FileUpload } from 'graphql-upload';
import { SEARCH_KEY_UID } from '../../config';
import generateFilename from '../../utils/files/generateFilename';
import IsImageFileValid from '../../utils/files/isImageFileValid';
import saveFile from '../../utils/files/saveFile';
import { searchClient } from '../../utils/mepster/searchClient';

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

export default async function GetSearchKey() {
    let SearchKeyObj = await searchClient.getKey(SEARCH_KEY_UID);

    return SearchKeyObj.key;
}
