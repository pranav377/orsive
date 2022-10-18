import { ReadStream } from "fs";

class BaseStorage {
  options: any = {};

  getFileUploadPath(fileRelativePath: string) {
    return fileRelativePath;
  }

  async create(fileRelativePath: string, _content: any, _mime: string) {
    return fileRelativePath;
  }

  async save(_createReadStream: ReadStream, fileRelativePath: string) {
    return fileRelativePath;
  }
}

export default BaseStorage;
