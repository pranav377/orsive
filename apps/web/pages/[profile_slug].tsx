import TopBar from '../components/app/TopBar';
import { useProfilePage } from '../hooks/pages/profile/useProfilePage';
import { CalendarIcon } from '@heroicons/react/solid';
import Spinner from '../components/app/Spinner';
import EditProfile from '../components/forms/profile/EditProfile';
import Moment from 'react-moment';
import ProfilePosts from '../components/profile/ProfilePosts';
import refreshData from '../utils/refreshProfileData';
import Comp404 from '../components/app/404';
import { NextSeo } from 'next-seo';
import {
    EditProfileButton,
    FollowButton,
} from '../components/profile/ProfileButtons';
import LinkifyContent from '../components/app/LinkifyContent';
import { Layout } from '../components/app/Layout';
import { nFormatter } from '../components/app/nFormatter';
import { ContentStateActions } from '../store/slices/contentSlice';
import Image from 'next/image';

export interface ProfileType {
    username: string;
    name: string;
    avatar: string;
    banner: string | null;
    bio: string;
    joined: string;
    reputation: number;
    roles: Array<'Staff' | 'Mod' | 'Early User'>;
    _count: {
        followers: number;
        following: number;
    };
}

export default function Profile() {
    const {
        profileBanner,
        shouldShowTopBar,
        user,
        dispatch,
        profileQuery,
        router,
    } = useProfilePage();

    if (profileQuery.loading) {
        return (
            <>
                <Layout title="Orsive">
                    <TopBar loading />

                    <div className="flex h-[85vh] items-center justify-center">
                        <Spinner />
                    </div>
                </Layout>
            </>
        );
    }

    if (profileQuery.data) {
        let profile: ProfileType = profileQuery.data.getUser;
        return (
            <>
                <NextSeo
                    title={`${profile.name} | Orsive`}
                    openGraph={{
                        url: `https://orsive.com${router.asPath}`,
                        title: `${profile.name} | Orsive`,
                        type: 'profile',
                        profile: {
                            username: profile.username,
                        },
                    }}
                />
                <TopBar
                    transparent={!shouldShowTopBar}
                    content={
                        <div className="flex flex-col items-start pl-5">
                            <span className="text-xl font-bold">
                                {profile.name}
                            </span>
                            <span className="text-gray-400">
                                {profile._count.followers} followers
                            </span>
                        </div>
                    }
                />
                <Layout>
                    <div className="flex w-full flex-col items-center">
                        {profile.banner && (
                            <div className="flex w-full justify-center bg-slate-900 bg-opacity-60 p-5">
                                <img
                                    ref={profileBanner}
                                    className="aspect-video max-h-[50vh] min-h-[20vh]"
                                    src={profile.banner}
                                    alt="profile_banner"
                                />
                            </div>
                        )}

                        <div
                            className={`w-[90vw] md:max-w-3xl ${
                                !profile.banner ? 'mt-20' : 'mt-4'
                            }`}
                        >
                            <div className="flex flex-col items-center md:items-start">
                                <div className="flex md:flex-col">
                                    <div className="relative h-20 w-20">
                                        <Image
                                            src={profile.avatar}
                                            alt={profile.username}
                                            className="rounded-full object-cover object-center"
                                            fill
                                        />
                                    </div>
                                    <div className="ml-2 flex flex-col justify-center">
                                        <span className="text-xl font-semibold">
                                            {profile.name}
                                        </span>
                                        <p className="font-normal text-gray-300">
                                            ${profile.username}
                                        </p>
                                    </div>
                                </div>
                                {profile.roles.length !== 0 && (
                                    <div className="mt-4 ml-2">
                                        {profile.roles.map((role, idx) => {
                                            if (role === 'Early User') {
                                                return (
                                                    <button
                                                        key={idx}
                                                        className="ripple-bg-blue-500 mr-2 rounded-md px-2.5 py-0.5 text-sm font-medium text-white"
                                                    >
                                                        Early User
                                                    </button>
                                                );
                                            }
                                            if (role === 'Mod') {
                                                return (
                                                    <button
                                                        key={idx}
                                                        className="ripple-bg-purple-800 mr-2 rounded-md px-2.5 py-0.5 text-sm font-medium text-white"
                                                    >
                                                        Mod
                                                    </button>
                                                );
                                            }

                                            if (role === 'Staff') {
                                                return (
                                                    <button
                                                        key={idx}
                                                        className="ripple-bg-red-500 mr-2 rounded-md px-2.5 py-0.5 text-sm font-medium text-white"
                                                    >
                                                        Staff
                                                    </button>
                                                );
                                            }

                                            return null;
                                        })}
                                    </div>
                                )}
                                <div
                                    {...(!profile.banner && {
                                        ref: profileBanner,
                                    })}
                                    className="flex w-full flex-col items-center text-center md:flex-row md:items-start md:text-left"
                                >
                                    <div>
                                        <div className="mt-2 flex text-sm sm:text-base">
                                            <div className="mr-3">
                                                <span className=" font-semibold">
                                                    {nFormatter(
                                                        profile._count
                                                            .followers,
                                                        2
                                                    )}
                                                </span>{' '}
                                                <span className="text-gray-300">
                                                    followers
                                                </span>
                                            </div>
                                            <div className="mr-3">
                                                <span className="font-semibold">
                                                    {nFormatter(
                                                        profile._count
                                                            .following,
                                                        2
                                                    )}
                                                </span>{' '}
                                                <span className="text-gray-300">
                                                    following
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-semibold">
                                                    {nFormatter(
                                                        profile.reputation,
                                                        2
                                                    )}
                                                </span>{' '}
                                                <span className="text-gray-300">
                                                    reputation
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center text-sm text-gray-300 sm:text-base md:justify-start">
                                            <CalendarIcon className="mr-1 h-4 w-4" />{' '}
                                            Joined
                                            <Moment
                                                className="ml-1"
                                                date={profile.joined}
                                                format="MMMM YYYY"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col p-2 md:ml-auto">
                                        <LinkifyContent>
                                            <div className="text-md text-break">
                                                {profile.bio}
                                            </div>
                                        </LinkifyContent>
                                        <div className="mt-auto self-center">
                                            {user.username ===
                                            profile.username ? (
                                                <EditProfileButton
                                                    onClick={() => {
                                                        dispatch(
                                                            ContentStateActions.setShowEditProfile(
                                                                true
                                                            )
                                                        );
                                                    }}
                                                />
                                            ) : (
                                                <FollowButton
                                                    username={profile.username}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <ProfilePosts profile={profile} />
                            </div>
                        </div>
                    </div>
                    <EditProfile refreshData={refreshData} profile={profile} />
                </Layout>
            </>
        );
    }

    if (profileQuery.error) {
        return (
            <>
                <Comp404 />
            </>
        );
    }

    return null;
}
