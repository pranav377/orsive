import { graphql } from '@/gql';

const EDITOR_IMAGE_UPLOAD = graphql(`
    mutation EditorImageUpload($image: Upload!) {
        editorImageUpload(image: $image) {
            file
        }
    }
`);

export default EDITOR_IMAGE_UPLOAD;
