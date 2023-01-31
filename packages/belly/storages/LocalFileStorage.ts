import path from 'path';
import fse from 'fs-extra';
import { ReadStream } from 'fs-capacitor';
import BaseStorage from '.';

class LocalFileStorage extends BaseStorage {
    constructor(uploadPath: string) {
        super();
        this.options.uploadDir = uploadPath;
    }

    getFileUploadPath(fileRelativePath: string) {
        return path.join(this.options.uploadDir, fileRelativePath);
    }

    async create(fileRelativePath: string, content: any, _mime: string) {
        // fileRelativePath example -- avatars/avatar.png
        let fileUploadPath = this.getFileUploadPath(fileRelativePath);

        await fse.outputFile(fileUploadPath, content);

        return fileRelativePath;
    }

    async save(createReadStream: ReadStream, fileRelativePath: string) {
        let fileUploadPath = this.getFileUploadPath(fileRelativePath);
        let fileUploadDirObjs = fileUploadPath.split('/');
        fileUploadDirObjs.pop();
        let fileUploadDir = fileUploadDirObjs.join('/');

        if (!fse.existsSync(fileUploadDir)) {
            fse.mkdirSync(fileUploadDir, { recursive: true });
        }

        const readStream = createReadStream;
        const writeStream = fse.createWriteStream(fileUploadPath);

        readStream.pipe(writeStream);

        return fileRelativePath;
    }
}

export default LocalFileStorage;
