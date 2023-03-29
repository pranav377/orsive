import { useState } from 'react';
import Link from 'next/link';
import signOut from '../../../logic/auth/signOut';
import toast from 'react-hot-toast';
import LogoSVG from '../../svgs/logo.svg';
import { useHomeUrl } from '../../../hooks/app/useHomeUrl';
import Button from '../../base/button';
import { useAppState } from '../../../hooks/app/useAppState';
import { useUser } from '../../../hooks/auth/useUser';
import { useRouter } from 'next/router';
import Drawer from 'react-modern-drawer';

import 'react-modern-drawer/dist/index.css';
import classNames from '../../utils/classnames';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import NotificationsSolidIcon from '@mui/icons-material/Notifications';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';

export const withoutNavbarPaths = [
    '/',
    '/auth',
    '/image/[image_slug]',
    '/orsic/[orsic_slug]',
    '/image/[image_slug]/comments/[comment_slug]',
    '/orsic/[orsic_slug]/comments/[comment_slug]',
    '/image/[image_slug]/comments/[comment_slug]/replies/[reply_slug]',
    '/orsic/[orsic_slug]/comments/[comment_slug]/replies/[reply_slug]',
    '/edit/image/[image_slug]',
    '/edit/orsic/[orsic_slug]',
    '/[profile_slug]',
];

export default function Navbar() {
    const user = useUser();
    const appState = useAppState();
    const router = useRouter();

    const homeUrl = useHomeUrl();

    if (!withoutNavbarPaths.includes(router.pathname) && appState.showBars) {
        return (
            <>
                <div className="grid w-full grid-cols-6 gap-0 bg-slate-900 p-5">
                    <Link href={homeUrl} className="w-fit">
                        <div className="flex items-center">
                            <LogoSVG className="h-10" />
                            {router.pathname === '/' && (
                                <span className="text-lg font-semibold">
                                    Orsive
                                </span>
                            )}
                        </div>
                    </Link>
                    <div className="col-start-2 col-end-7 flex flex-row items-center justify-end">
                        {user.is ? (
                            <>
                                <span className="relative mr-5 inline-flex cursor-pointer">
                                    <Link
                                        href={'/notifications'}
                                        className={classNames(
                                            router.pathname === '/notifications'
                                                ? 'text-blue-400'
                                                : 'text-gray-300',
                                            'flex flex-col items-center transition duration-200 ease-in hover:text-blue-400'
                                        )}
                                    >
                                        {router.pathname ===
                                        '/notifications' ? (
                                            <NotificationsSolidIcon />
                                        ) : (
                                            <NotificationsOutlinedIcon />
                                        )}
                                        {user.unreadNotifications && (
                                            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-2 w-2">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
                                            </span>
                                        )}
                                    </Link>
                                </span>
                                <ProfileDropdown />
                            </>
                        ) : (
                            <Link href="/auth">
                                <Button className="ripple-bg-blue-600 bg-blue-600 hover:bg-blue-700">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </>
        );
    } else {
        return null;
    }
}

function ProfileDropdown() {
    const user = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <>
            <IconButton onClick={toggleDrawer} style={{ padding: 0 }}>
                <Avatar className="bg-gray-800">
                    <Image
                        fill
                        alt="user avatar"
                        className=" p-0.5"
                        src={user.avatar}
                    />
                </Avatar>
            </IconButton>

            {isOpen && (
                <style jsx global>{`
                    html,
                    body {
                        margin: 0;
                        overflow: hidden;
                    }
                `}</style>
            )}
            <Drawer
                overlayOpacity={0.2}
                open={isOpen}
                onClose={toggleDrawer}
                direction="right"
                className="!bg-slate-900"
            >
                <div className="h-full p-4">
                    <Link href={`/${user.username}`}>
                        <div className="flex-col">
                            <div className="relative ml-auto mr-auto h-20 w-20">
                                <Image
                                    alt={user.username}
                                    src={user.avatar}
                                    fill
                                    className="rounded-full object-cover object-center"
                                />
                            </div>
                            <div className="flex flex-col justify-center text-center">
                                <span className="text-xl font-semibold">
                                    {user.name}
                                </span>
                                <p className="w-full overflow-hidden text-ellipsis font-normal text-gray-300">
                                    ${user.username}
                                </p>
                            </div>
                        </div>
                    </Link>

                    <div className="mt-3 flex h-[90%] w-full flex-col gap-2">
                        <Link
                            href={`/${user.username}`}
                            className={
                                'ripple-bg-slate-800 w-full rounded-md p-2 text-left text-sm font-medium'
                            }
                        >
                            View Profile
                        </Link>
                        <Button
                            className={
                                'ripple-bg-red-600 w-full text-left text-sm'
                            }
                            onClick={() => {
                                toast
                                    .promise(signOut(), {
                                        loading: 'Signing out...',
                                        success: 'Successfully Signed out!',
                                        error: 'Something went wrong. Try again',
                                    })
                                    .finally(() => {
                                        setIsOpen(false);
                                    });
                            }}
                        >
                            Sign out
                        </Button>
                        {user.isMod && (
                            <Link
                                href={`/moderation`}
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                                className={
                                    'ripple-bg-slate-800 w-full rounded-md p-2 text-left text-sm font-medium'
                                }
                            >
                                Moderation Bay
                            </Link>
                        )}
                        <Link
                            href={`/support`}
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            className={
                                'ripple-bg-slate-800 w-full rounded-md p-2 text-left text-sm font-medium'
                            }
                        >
                            Support
                        </Link>
                    </div>
                </div>
            </Drawer>
        </>
    );
}
