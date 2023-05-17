import EmailAuth from '@/ui/Auth/EmailAuth';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login with Email | Orsive',
    description: 'Login with your email to Orsive',
};

export default function Login() {
    return (
        <>
            <EmailAuth />
        </>
    );
}
