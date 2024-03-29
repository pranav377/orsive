import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '../auth/useUser';

export const useAuthRedirect = () => {
    const user = useUser();
    const router = useRouter();

    useEffect(() => {
        if (router.pathname !== '/feed' && user.is) {
            router.push('/feed');
        }
    });
};

export function getCook(cookiename: string, cookieString: string) {
    var cookiestring = RegExp(cookiename + '=[^;]+').exec(cookieString);
    return decodeURIComponent(
        !!cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : ''
    );
}
