import { graphql } from '@/gql';

const ME = graphql(`
    query MeQuery {
        me {
            avatar
            id
            name
            username
            setupComplete
        }
    }
`);

export default ME;
