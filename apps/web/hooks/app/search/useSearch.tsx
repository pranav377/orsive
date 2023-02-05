import { useEffect, useState } from 'react';
import { useQueryState } from 'next-usequerystate';
import getSearchIndex from '../../../logic/search/getSearchIndex';

export const useSearch = () => {
    const [results, setResults] = useState<Array<any>>([]);
    const [searchQuery, setSearchQuery] = useQueryState('q', {
        history: 'push',
    });

    useEffect(() => {
        async function search() {
            let query: any = searchQuery || '';
            let withoutExtraSpace = query.replace(/\s+/g, ' ').trim();

            if (withoutExtraSpace !== '' && withoutExtraSpace !== ' ') {
                const search = await (await getSearchIndex()).search(query);
                setResults(search.hits);
            }
        }

        search();
    }, [searchQuery]);

    return { searchQuery, setSearchQuery, results };
};
