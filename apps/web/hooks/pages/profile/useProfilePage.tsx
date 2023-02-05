import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { useHideBars } from '../../app/useHideBars';
import { useUser } from '../../auth/useUser';
import GET_PROFILE_QUERY from '../../../logic/profile/queries/getProfileQuery';

export const useProfilePage = () => {
    useHideBars();
    const router = useRouter();
    const profileQuery = useQuery(GET_PROFILE_QUERY, {
        variables: {
            username: router.query['profile_slug'],
        },
        skip: !router.query['profile_slug'],
    });

    const [shouldShowTopBar, setShouldShowTopBar] = useState(false);
    let profileBanner: any = useRef(null);

    useEffect(() => {
        function handleScroll() {
            if (profileQuery.data) {
                let elementTarget = profileBanner.current;
                if (
                    window.scrollY >
                    elementTarget!.offsetTop + elementTarget!.offsetHeight
                ) {
                    setShouldShowTopBar(true);
                } else {
                    setShouldShowTopBar(false);
                }
            }
        }

        window.addEventListener('scroll', handleScroll);

        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    const user = useUser();
    const dispatch = useDispatch();

    return {
        profileBanner,
        shouldShowTopBar,
        user,
        router,
        dispatch,
        profileQuery,
    };
};
