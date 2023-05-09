'use client';

import { useSearchParams } from 'next/navigation';
import useSnackbars from '../useSnackbars';
import { useEffect } from 'react';
import login from '@/technique/auth/login';
import useUserState from '@/state/userState';

const useHandleOAuthRedirect = () => {
    const authParams = useSearchParams();
    const { handleLoginWelcome, displayLoginError } = useSnackbars();
    const user = useUserState();
    console.log(user);

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
                    },
                    token: userAndToken.token,
                });

                handleLoginWelcome(userAndToken.name);
            }
        }
    }, [authParams, handleLoginWelcome, displayLoginError, user.is]);
};

export default useHandleOAuthRedirect;
