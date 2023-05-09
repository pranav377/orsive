'use client';

import ME from '@/graphql/queries/me';
import useUserState from '@/state/userState';
import login from '@/technique/auth/login';
import { useQuery } from 'urql';
import { useEffect, useState } from 'react';

// a middleware component that checks user's token in localstorage and sets the auth status

export default function CheckAuth() {
    const currUser = useUserState();
    const [runQuery, setRunQuery] = useState(false);

    const [me] = useQuery({
        query: ME,
        pause: !runQuery,
    });

    useEffect(() => {
        if (currUser.is !== 'authenticated') {
            setRunQuery(true);
            if (me.data) {
                login({
                    user: me.data.me,
                    token: localStorage.getItem('token') as string,
                });
            }
        }
    }, [currUser.is, me.data]);

    return null;
}
