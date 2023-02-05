import { gql } from '@apollo/client';

const GET_POST_SITEMAP_QUERY = gql`
    query GetPostSitemapQuery($page: Int!) {
        getPostSitemap(page: $page)
    }
`;

export default GET_POST_SITEMAP_QUERY;
