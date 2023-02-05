import { gql } from '@apollo/client';

const GET_REPLY_QUERY = gql`
    query GetReplyQuery($commentId: ID!) {
        getReply(comment_id: $commentId) {
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

export default GET_REPLY_QUERY;
