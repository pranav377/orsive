import { Virtuoso } from 'react-virtuoso';
import { useOneTimePageSpinner } from '../../hooks/app/useOneTimePageSpinner';
import { useProfilePosts } from '../../hooks/pages/profile/useProfilePosts';
import { ProfileType } from '../../pages/[profile_slug]';
import OneTimePageSpinner from '../app/OneTimePageSpinner';
import Spinner from '../app/Spinner';
import PostListRenderer from '../post/postListRendererBeta';
import BruhSVG from '../svgs/bruh.svg';

export default function ProfilePosts(props: { profile: ProfileType }) {
    const { query, objIdx, setObj, fetchMore } = useProfilePosts(props.profile);

    const { spinnerShown } = useOneTimePageSpinner(query.data);

    return (
        <>
            {query.data && (
                <>
                    {query.data.getProfilePosts.data.length == -0 && (
                        <>
                            <BruhSVG className="w-full" />
                            <p className="text-center text-xl">
                                This profile has no posts.
                            </p>
                        </>
                    )}

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
                        data={query.data.getProfilePosts.data}
                        endReached={fetchMore}
                        components={{
                            Footer: () => (
                                <>
                                    {query.data.getProfilePosts.hasNextPage && (
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
                spinnerShown={spinnerShown}
                long
                data={query.data}
            />
        </>
    );
}
