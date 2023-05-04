import { Client, cacheExchange, fetchExchange } from 'urql';
import { GRAPHQL_URL } from '@/config';

export const GraphQLClient = new Client({
    url: GRAPHQL_URL,
    exchanges: [cacheExchange, fetchExchange],
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
