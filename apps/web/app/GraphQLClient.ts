import { GRAPHQL_URL } from '@/config';
import logout from '@/technique/auth/logout';
import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createLink } from 'apollo-absinthe-upload-link';
import { onError } from '@apollo/client/link/error';

const httpLink = createLink({
    uri: GRAPHQL_URL,
});

const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        if (graphQLErrors) {
            for (let err of graphQLErrors) {
                if (err.extensions && err.extensions.code) {
                    switch (err.extensions.code) {
                        case 'FORBIDDEN':
                            logout();
                            const oldHeaders = operation.getContext().headers;
                            operation.setContext({
                                headers: {
                                    ...oldHeaders,
                                    authorization: undefined,
                                },
                            });
                            return forward(operation);
                    }
                }
            }
        }

        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
        }
    }
);

const authLink = setContext((_, { headers }) => {
    let token;

    if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('token');
    }

    return {
        headers: {
            ...headers,
            ...(token && {
                authorization: `Bearer ${token}`,
            }),
        },
    };
});

export const GraphQLClient = new ApolloClient({
    link: authLink.concat(from([errorLink, httpLink])),
    cache: new InMemoryCache(),
});
