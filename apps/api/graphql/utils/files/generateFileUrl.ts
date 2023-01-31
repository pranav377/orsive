import { FILE_UPLOADS_URL } from '../../config';

export default function generateFileUrl(fileRelativeUrl: string) {
    fileRelativeUrl = fileRelativeUrl.replace(/\\/g, '/');

    return new URL(fileRelativeUrl, FILE_UPLOADS_URL).toString();
}
