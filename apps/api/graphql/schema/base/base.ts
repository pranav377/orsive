import { gql } from 'apollo-server-express';

const BASE_SCHEMA = gql`
    scalar Upload
    scalar Date

    type EditorImageUploadResponse {
        file: String
    }

    type Query @rateLimit(limit: 900, duration: 60) {
        hello: String
        getSearchKey: String
    }

    type Mutation @rateLimit(limit: 500, duration: 60) {
        hello: String
        editorImageUpload(file: Upload!): EditorImageUploadResponse!
    }
`;

export default BASE_SCHEMA;
