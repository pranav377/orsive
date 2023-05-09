import { graphql } from '@/gql';

const ME = graphql(`
    query MeQuery {
        me {
            avatar
            id
            name
            username
        }
    }
`);

export default ME;
