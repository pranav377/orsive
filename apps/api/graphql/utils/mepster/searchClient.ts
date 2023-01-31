import { MeiliSearch } from 'meilisearch';
import { MEILISEARCH_MASTER_KEY, MEILISEARCH_URL } from '../../config';

export const searchClient = new MeiliSearch({
    host: MEILISEARCH_URL,
    apiKey: MEILISEARCH_MASTER_KEY,
});

export const searchIndex = searchClient.index('all');
