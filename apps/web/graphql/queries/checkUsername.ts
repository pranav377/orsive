import { graphql } from '@/gql';

const CHECK_USERNAME = graphql(`
    query CheckUsername($username: String!) {
        checkUsername(username: $username) {
            available
        }
    }
`);

export default CHECK_USERNAME;
