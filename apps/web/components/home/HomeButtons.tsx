import Button from '../base/button';
import GoogleSVG from '../svgs/google-color-logo.svg';
import DiscordSVG from '../svgs/discord-color-logo.svg';
import { InboxIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { DISCORD_AUTH_URL, GOOGLE_AUTH_URL } from '../../config';
import Link from 'next/link';

export default function HomeButtons() {
    const router = useRouter();
    return (
        <div className="home mt-5 flex w-full flex-col items-center gap-2">
            <Button
                onClick={() => router.push(GOOGLE_AUTH_URL)}
                className="ripple-bg-white flex w-56 items-center justify-center gap-2 rounded-3xl text-black"
            >
                <GoogleSVG className="h-6 w-5" />
                Login with Google
            </Button>
            <Button
                onClick={() => router.push(DISCORD_AUTH_URL)}
                className="ripple-bg-slate-700 flex w-56 items-center justify-center gap-2 rounded-3xl"
            >
                <DiscordSVG className="h-6 w-6" />
                Login with Discord
            </Button>
            <Button
                onClick={() => router.push('/auth')}
                className="ripple-bg-blue-700 flex w-56 items-center justify-center gap-2 rounded-3xl"
            >
                <InboxIcon className="h-6 w-6" />
                Login with Email
            </Button>

            <span className="flex w-full items-center justify-center font-medium">
                Or
            </span>

            <Link
                href={'/feed'}
                passHref
                className="ripple-bg-blue-700 flex w-56 items-center justify-center gap-2 rounded-3xl p-2 font-medium"
            >
                Explore
            </Link>

            <Button
                onClick={() => router.push('/auth?page=signup')}
                className="mt-5 font-semibold"
            >
                Wanna be a Smarty Capty? Sign Up
            </Button>
        </div>
    );
}
