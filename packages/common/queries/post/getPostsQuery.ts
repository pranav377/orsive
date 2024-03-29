import { gql } from '@apollo/client';

const GET_POSTS_QUERY = gql`
    query getPostsQuery($page: Int) {
        getPosts(page: $page) {
            data {
                __typename
                ... on Image {
                    title
                    image
                    width
                    height
                    slug
                    post {
                        uploadedBy {
                            name
                            username
                            avatar
                        }
                        id
                    }
                }
                ... on Orsic {
                    title
                    content
                    truncated
                    slug
                    post {
                        uploadedBy {
                            name
                            username
                            avatar
                        }
                        id
                    }
                }
            }
            hasNextPage
            nextPage
        }
    }
`;

export default GET_POSTS_QUERY;
