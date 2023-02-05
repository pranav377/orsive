import { useEffect } from 'react';
import { client } from '../../pages/_app';

export const useClearApolloCacheOnExit = (fieldName: string) => {
    useEffect(() => {
        return function cleanup() {
            client.cache.evict({
                fieldName,
            });
            // client.cache.reset();
        };
    }, []);
};
