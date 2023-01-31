import { gql } from '@apollo/client';

export const GET_SEARCH_KEY_QUERY = gql`
    query GetSearchKeyQuery {
        getSearchKey
    }
`;
