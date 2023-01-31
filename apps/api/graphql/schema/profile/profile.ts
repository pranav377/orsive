import { gql } from 'apollo-server-express';

const PROFILE_SCHEMA = gql`
    type Query {
        getProfilePosts(username: String!, page: Int): GetPostsResponse
        getFollowingPosts(page: Int): GetPostsResponse
        amIFollowing(username: String!): Boolean!
    }

    input EditProfileInput {
        username: String
        name: String!
        avatar: Upload
        banner: Upload
        bio: String
    }

    type Mutation {
        editProfile(input: EditProfileInput!): User!
    }
`;

export default PROFILE_SCHEMA;
