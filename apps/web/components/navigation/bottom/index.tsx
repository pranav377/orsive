import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from '../../utils/classnames';
import { useDispatch } from 'react-redux';
import PostOrsic from '../../forms/content/post-orsic';
import PostImage from '../../forms/content/post-image';
import Modal from '../../app/Modal';
import {
    NewspaperIcon,
    PhotographIcon,
    QuestionMarkCircleIcon,
    SearchIcon,
    UserIcon,
    HomeIcon,
    PlusIcon,
    LibraryIcon,
} from '@heroicons/react/outline';
import {
    HomeIcon as HomeIconSolid,
    LibraryIcon as LibraryIconSolid,
    SearchIcon as SearchIconSolid,
    UserIcon as UserIconSolid,
} from '@heroicons/react/solid';
import PostCards from '../../app/PostCard/PostCards';
import PostCard from '../../app/PostCard';
import { usePostContentState } from '../../../hooks/app/content/usePostContentState';
import { useHomeUrl } from '../../../hooks/app/useHomeUrl';
import { useAppState } from '../../../hooks/app/useAppState';
import { useUser } from '../../../hooks/auth/useUser';
import { showLoginDialog } from '../../../logic/auth/showLoginDialog';
import { useRef } from 'react';
import { withoutNavbarPaths } from '../navbar';
import { ContentStateActions } from '../../../store/slices/contentSlice';

export default function BottomNavigation() {
    const router = useRouter();
    const appState = useAppState();
    const user = useUser();
    const homeUrl = useHomeUrl();

    if (!withoutNavbarPaths.includes(router.pathname) && appState.showBars) {
        return (
            <>
                <div className="shadow-3xl fixed bottom-2 right-0 left-0 m-2  flex items-center justify-between   rounded-2xl bg-gray-900 p-5   px-6 text-gray-400 md:left-1/2 md:-translate-x-1/2">
                    <Link
                        href={{
                            pathname: homeUrl,
                        }}
                        passHref
                        className={classNames(
                            router.pathname === homeUrl && 'text-blue-400',
                            'flex flex-col items-center transition duration-200 ease-in hover:text-blue-400'
                        )}
                    >
                        {router.pathname === homeUrl ? (
                            <HomeIconSolid className="h-6 w-6" />
                        ) : (
                            <HomeIcon className="h-6 w-6" />
                        )}
                    </Link>
                    <Link
                        href={'/following'}
                        passHref
                        className={classNames(
                            router.pathname === '/following' && 'text-blue-400',
                            'flex flex-col items-center transition duration-200 ease-in hover:text-blue-400'
                        )}
                    >
                        {router.pathname === '/following' ? (
                            <LibraryIconSolid className="h-6 w-6" />
                        ) : (
                            <LibraryIcon className="h-6 w-6" />
                        )}
                    </Link>

                    <AddPostDropup />
                    <Link
                        href={'/search'}
                        passHref
                        className={classNames(
                            router.pathname === '/search' && 'text-blue-400',
                            'flex flex-col items-center transition duration-200 ease-in hover:text-blue-400'
                        )}
                    >
                        {router.pathname === '/search' ? (
                            <SearchIconSolid className="h-6 w-6" />
                        ) : (
                            <SearchIcon className="h-6 w-6" />
                        )}
                    </Link>
                    {user.is ? (
                        <Link
                            href={`/${user.username}`}
                            passHref
                            className={classNames(
                                router.pathname === `/${user.username}` &&
                                    user.username !== '' &&
                                    'text-blue-400',
                                'flex flex-col items-center transition duration-200 ease-in hover:text-blue-400'
                            )}
                        >
                            {router.pathname === `/${user.username}` ? (
                                <UserIconSolid className="h-6 w-6" />
                            ) : (
                                <UserIcon className="h-6 w-6" />
                            )}
                        </Link>
                    ) : (
                        <button
                            onClick={() => {
                                showLoginDialog();
                            }}
                            className="flex flex-col items-center transition duration-200 ease-in hover:text-blue-400"
                        >
                            <UserIcon className="h-6 w-6" />
                        </button>
                    )}
                </div>
            </>
        );
    } else {
        return null;
    }
}

function AddPostDropup() {
    const dispatch = useDispatch();

    const postContentState = usePostContentState();
    const addPostButton = useRef<HTMLButtonElement>(null);

    return (
        <>
            <PostOrsic />
            <PostImage />
            <Modal
                closeModal={() =>
                    dispatch(ContentStateActions.setShowPostContent(false))
                }
                show={postContentState.postContent}
                content={
                    <>
                        <PostCards>
                            <PostCard
                                onClick={() => {
                                    dispatch(
                                        ContentStateActions.setShowPostContent(
                                            false
                                        )
                                    );
                                    dispatch(
                                        ContentStateActions.setShowPostOrsic(
                                            true
                                        )
                                    );
                                }}
                                icon={
                                    <NewspaperIcon className="h-12 w-12 rounded-full text-blue-700" />
                                }
                                heading="Orsic"
                                description="Anything that's going on in your head, A status update, or a
                full blown article. It's up to you."
                            />
                            <PostCard
                                onClick={() => {
                                    dispatch(
                                        ContentStateActions.setShowPostContent(
                                            false
                                        )
                                    );
                                    dispatch(
                                        ContentStateActions.setShowPostImage(
                                            true
                                        )
                                    );
                                }}
                                icon={
                                    <PhotographIcon className="h-12 w-12 rounded-full text-green-700" />
                                }
                                heading="Image"
                                description="A photo or a picture of something you want to share."
                            />
                            <PostCard
                                comingSoon
                                onClick={() => {}}
                                icon={
                                    <QuestionMarkCircleIcon className="h-12 w-12 rounded-full text-yellow-700" />
                                }
                                heading="Question"
                                description="Ask a question. Can be doubts, random questions, etc."
                            />
                        </PostCards>
                    </>
                }
            />
            <div className="flex flex-col items-center">
                <button
                    onClick={() => {
                        dispatch(ContentStateActions.setShowPostContent(true));
                    }}
                    ref={addPostButton}
                    className="absolute bottom-5 flex h-14 w-14 items-center justify-center rounded-full border-4 border-gray-50 bg-blue-500 p-2 text-center text-3xl text-white shadow-none outline-none"
                >
                    <PlusIcon />
                </button>
            </div>
        </>
    );
}
