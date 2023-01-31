import { gql } from '@apollo/client';

const GET_PROFILE_QUERY = gql`
    query getProfileQuery($username: String!) {
        getUser(username: $username) {
            username
            name
            avatar
            banner
            bio
            joined
            reputation
            roles
            _count {
                followers
                following
            }
        }
    }
`;

export default GET_PROFILE_QUERY;
