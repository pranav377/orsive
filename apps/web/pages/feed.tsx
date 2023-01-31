import { Layout } from '../components/app/Layout';
import OneTimePageSpinner from '../components/app/OneTimePageSpinner';
import Spinner from '../components/app/Spinner';
import { useOneTimePageSpinner } from '../hooks/app/useOneTimePageSpinner';
import { useFeedPage } from '../hooks/pages/feed/useFeedPage';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { client } from './_app';
import { Virtuoso } from 'react-virtuoso';
import PostListRenderer from '../components/post/postListRendererBeta';

export default function Feed() {
    const { query, fetchMore, objIdx, setObj } = useFeedPage();
    const { spinnerShown, setSpinnerShown } = useOneTimePageSpinner(query.data);

    return (
        <>
            <Layout title={'Feed | Orsive'}>
                <PullToRefresh
                    pullingContent={''}
                    onRefresh={async () => {
                        setSpinnerShown(false);
                        client.cache.reset();
                        client.resetStore();
                    }}
                >
                    <div className="flex justify-center">
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
                                    data={query.data.getPosts.data}
                                    endReached={fetchMore}
                                    components={{
                                        Footer: () => (
                                            <>
                                                {query.data.getPosts
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
                            </>
                        )}

                        <OneTimePageSpinner
                            long
                            data={query.data}
                            spinnerShown={spinnerShown}
                        />
                    </div>
                </PullToRefresh>
            </Layout>
        </>
    );
}
