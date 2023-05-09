import { CodegenConfig } from '@graphql-codegen/cli';
import { GRAPHQL_URL } from './config';

const config: CodegenConfig = {
    schema: GRAPHQL_URL,
    documents: ['./graphql/**/*.ts'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './gql/': {
            preset: 'client',
            plugins: [],
        },
    },
};

export default config;
