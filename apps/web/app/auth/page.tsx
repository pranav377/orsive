import Auth from '@/ui/Auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Auth | Orsive',
};

export default function AuthPage() {
    return (
        <>
            <Auth />
        </>
    );
}
