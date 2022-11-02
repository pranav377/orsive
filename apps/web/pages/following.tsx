import PullToRefresh from "react-simple-pull-to-refresh";
import VirtualScroller from "virtual-scroller/react";
import Empty from "../components/app/Empty";
import { Layout } from "../components/app/Layout";
import OneTimePageSpinner from "../components/app/OneTimePageSpinner";
import Spinner from "../components/app/Spinner";
import AccessDenied from "../components/forms/content/accessDenied";
import PostListRenderer from "../components/post/postListRenderer";
import { useOneTimePageSpinner } from "../hooks/app/useOneTimePageSpinner";
import { useScrollRestoring } from "../hooks/app/useScrollRestoring";
import { useFollowingPage } from "../hooks/pages/following/useFollowingPage";
import { client } from "./_app";

export default function Following() {
  const { query, loadMoreElement, user } = useFollowingPage();
  const { spinnerShown, setSpinnerShown } = useOneTimePageSpinner(query.data);
  useScrollRestoring();

  return (
    <Layout title="Following | Orsive">
      <PullToRefresh
        pullingContent={""}
        onRefresh={async () => {
          setSpinnerShown(false);
          client.cache.reset();
          client.resetStore();
        }}
      >
        <div className="flex items-center mb-1 flex-col">
          {!user.is && (
            <div className="h-[60vh] md:h-[90vh] flex">
              <AccessDenied />
            </div>
          )}

          {query.data && (
            <>
              <VirtualScroller
                className="flex flex-col items-center"
                items={query.data.getFollowingPosts.data}
                itemComponent={PostListRenderer}
              />

              {query.data.getFollowingPosts.hasNextPage && (
                <div
                  ref={loadMoreElement}
                  className={`flex items-center justify-center m-2`}
                >
                  <Spinner />
                </div>
              )}

              {query.data.getFollowingPosts.data.length === 0 && user.is && (
                <div className="pt-20 w-full">
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
