import { gql } from '@apollo/client';

const FOLLOW_PROFILE_MUTATION = gql`
    mutation FollowProfileMutation($username: String!) {
        followUser(username: $username)
    }
`;

export default FOLLOW_PROFILE_MUTATION;
