declare module 'apollo-absinthe-upload-link' {
    import { ApolloLink, HttpOptions } from '@apollo/client';
    export const createLink: (linkOptions?: HttpOptions) => ApolloLink;
}
