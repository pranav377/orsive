'use client';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useUserState from '@/state/userState';
import { useRouter } from 'next/navigation';
import LoadingComponent from '@/ui/LoadingComponent';

export default function AuthLayout(props: { children: React.ReactNode }) {
    const currUser = useUserState();
    const router = useRouter();

    switch (currUser.is) {
        case 'loading': {
            return <LoadingComponent />;
        }
        case 'authenticated': {
            router.push('/home');
            return <LoadingComponent />;
        }
        case 'unauthenticated': {
            return <>{props.children}</>;
        }
    }
}
