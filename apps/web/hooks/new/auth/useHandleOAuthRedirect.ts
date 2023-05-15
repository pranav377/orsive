'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import useSnackbars from '../useSnackbars';
import { useEffect } from 'react';
import login from '@/technique/auth/login';
import useUserState from '@/state/userState';

const useHandleOAuthRedirect = () => {
    const authParams = useSearchParams();
    const { handleLoginWelcome, displayLoginError } = useSnackbars();
    const user = useUserState();
    const router = useRouter();

    useEffect(() => {
        if (authParams) {
            let userAndToken = Object.fromEntries(authParams);

            if (userAndToken.error) {
                displayLoginError(userAndToken.error);
            } else if (userAndToken.token && user.is !== 'authenticated') {
                login({
                    user: {
                        id: userAndToken.id,
                        name: userAndToken.name,
                        username: userAndToken.username,
                        avatar: userAndToken.avatar,
                        setupComplete: userAndToken.setupComplete == 'true',
                    },
                    token: userAndToken.token,
                });

                router.replace('/home');

                handleLoginWelcome(userAndToken.name);
            }
        }
    }, [authParams, handleLoginWelcome, displayLoginError, user.is, router]);

    return { currUser: user };
};

export default useHandleOAuthRedirect;
