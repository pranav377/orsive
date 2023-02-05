import PullToRefresh from 'react-simple-pull-to-refresh';
import { Virtuoso } from 'react-virtuoso';
import Empty from '../components/app/Empty';
import { Layout } from '../components/app/Layout';
import OneTimePageSpinner from '../components/app/OneTimePageSpinner';
import Spinner from '../components/app/Spinner';
import AccessDenied from '../components/forms/content/accessDenied';
import PostListRenderer from '../components/post/postListRendererBeta';
import { useOneTimePageSpinner } from '../hooks/app/useOneTimePageSpinner';
import { useFollowingPage } from '../hooks/pages/following/useFollowingPage';
import { client } from './_app';

export default function Following() {
    const { query, user, objIdx, setObj, fetchMore } = useFollowingPage();
    const { spinnerShown, setSpinnerShown } = useOneTimePageSpinner(query.data);

    return (
        <Layout title="Following | Orsive">
            <PullToRefresh
                pullingContent={''}
                onRefresh={async () => {
                    setSpinnerShown(false);
                    client.cache.reset();
                    client.resetStore();
                }}
            >
                <div className="mb-1 flex flex-col items-center">
                    {!user.is && (
                        <div className="flex h-[60vh] md:h-[90vh]">
                            <AccessDenied />
                        </div>
                    )}

                    {query.data && (
                        <>
                            <Virtuoso
                                useWindowScroll
                                {...(objIdx && {
                                    initialTopMostItemIndex: objIdx,
                                })}
                                className="mb-1 w-[90vw] overflow-hidden md:max-w-3xl"
                                overscan={{
                                    main: 200,
                                    reverse: 200,
                                }}
                                data={query.data.getFollowingPosts.data}
                                endReached={fetchMore}
                                components={{
                                    Footer: () => (
                                        <>
                                            {query.data.getFollowingPosts
                                                .hasNextPage && (
                                                <div
                                                    className={`m-2 flex items-center justify-center`}
                                                >
                                                    <Spinner />
                                                </div>
                                            )}
                                        </>
                                    ),
                                }}
                                itemContent={(thisObjIdx, post) => (
                                    <PostListRenderer
                                        post={post}
                                        objIdx={thisObjIdx}
                                        setObj={setObj}
                                    />
                                )}
                            />

                            {query.data.getFollowingPosts.data.length === 0 &&
                                user.is && (
                                    <div className="w-full pt-20">
                                        <Empty message="No posts from the people you follow :(" />
                                    </div>
                                )}
                        </>
                    )}

                    {user.is && (
                        <OneTimePageSpinner
                            spinnerShown={spinnerShown}
                            data={query.data}
                            long
                        />
                    )}
                </div>
            </PullToRefresh>
        </Layout>
    );
}
