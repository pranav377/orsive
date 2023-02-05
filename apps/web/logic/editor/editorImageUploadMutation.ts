import { gql } from '@apollo/client';

const EDITOR_IMAGE_UPLOAD_MUTATION = gql`
    mutation EditorImageUpload($file: Upload!) {
        editorImageUpload(file: $file) {
            file
        }
    }
`;

export default EDITOR_IMAGE_UPLOAD_MUTATION;
