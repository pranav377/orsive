import { Client, cacheExchange, fetchExchange } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { GRAPHQL_URL } from '@/config';
import logout from '@/technique/auth/logout';

export const GraphQLClient = new Client({
    url: GRAPHQL_URL,
    exchanges: [
        cacheExchange,
        fetchExchange,
        authExchange(async (utils) => {
            let token: string | null = null;

            if (typeof window !== 'undefined' && window.localStorage) {
                token = localStorage.getItem('token');
            }

            return {
                addAuthToOperation(operation) {
                    if (!token) return operation;
                    return utils.appendHeaders(operation, {
                        authorization: `Bearer ${token}`,
                    });
                },
                didAuthError(error, _operation) {
                    error.graphQLErrors.some((e) => e.extensions);
                    return error.graphQLErrors.some(
                        (e) => e.extensions?.code === 'FORBIDDEN'
                    );
                },
                async refreshAuth() {
                    logout();
                },
            };
        }),
    ],
    fetchOptions: () => {
        let token;

        if (typeof window !== 'undefined' && window.localStorage) {
            token = localStorage.getItem('token');
        }
        return {
            headers: { authorization: token ? `Bearer ${token}` : '' },
        };
    },
});
