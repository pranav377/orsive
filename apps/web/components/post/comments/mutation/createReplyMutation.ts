import { gql } from '@apollo/client';

const CREATE_REPLY_MUTATION = gql`
    mutation ($parentId: ID!, $content: String!) {
        createReply(input: { content: $content, parent_id: $parentId }) {
            content
            post {
                id
                uploadedBy {
                    username
                    name
                    avatar
                }
                createdAt
            }
        }
    }
`;

export default CREATE_REPLY_MUTATION;
