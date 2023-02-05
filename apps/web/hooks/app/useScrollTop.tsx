import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useScrollTop = () => {
    const router = useRouter();

    useEffect(() => {
        if (router.pathname !== '/feed') {
            window.scrollTo(0, 0);
        }
    }, []);
};
