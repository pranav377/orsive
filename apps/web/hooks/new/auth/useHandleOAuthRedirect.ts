'use client';

import { useSearchParams } from 'next/navigation';
import useSnackbars from '../useSnackbars';
import { useEffect } from 'react';
import login from '@/technique/auth/login';

const useHandleOAuthRedirect = () => {
    const authParams = useSearchParams();
    const { handleLoginWelcome, displayLoginError } = useSnackbars();

    useEffect(() => {
        if (authParams) {
            let userAndToken = Object.fromEntries(authParams);

            if (userAndToken.error) {
                displayLoginError(userAndToken.error);
            } else if (userAndToken.token) {
                login({
                    user: {
                        id: userAndToken.id,
                        name: userAndToken.name,
                        username: userAndToken.username,
                        avatar: userAndToken.avatar,
                    },
                    token: userAndToken.token,
                });

                handleLoginWelcome(userAndToken.name);
            }
        }
    }, [authParams, handleLoginWelcome, displayLoginError]);
};

export default useHandleOAuthRedirect;
