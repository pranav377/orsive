import { graphql } from '@/gql';

const SETUP_LANGUAGES = graphql(`
    mutation SetupLanguages($languages: [String!]!) {
        setupLanguages(languages: $languages) {
            avatar
            id
            name
            setupComplete
            username
        }
    }
`);

export default SETUP_LANGUAGES;
