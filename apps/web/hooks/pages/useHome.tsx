import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getCook } from '../app/useAuthRedirect';
import { useHideBars } from '../app/useHideBars';
import { useUser } from '../auth/useUser';

export const useHome = () => {
    useHideBars();
    const user = useUser();
    const router = useRouter();

    const [loading, setLoading] = useState(false); // setting false for seo

    useEffect(() => {
        setLoading(true);
        if (user.is) {
            router.push('/feed');
        } else {
            setLoading(false);
        }
    }, [user]);

    return { loading };
};
