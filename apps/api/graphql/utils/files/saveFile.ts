import { FileUpload } from 'graphql-upload';
import storage from '../../../storage';
import generateFileUrl from './generateFileUrl';

export default async function saveFile(
    full_path: string,
    fileData: FileUpload
) {
    let file = await storage.save(fileData.createReadStream(), full_path);
    file = generateFileUrl(file);

    return file;
}
