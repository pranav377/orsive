import { gql } from '@apollo/client';

const CREATE_COMMENT_MUTATION = gql`
    mutation ($postId: ID!, $content: String!) {
        createComment(input: { content: $content, post_id: $postId }) {
            content
            replies
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

export default CREATE_COMMENT_MUTATION;
