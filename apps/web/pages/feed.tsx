import { Layout } from "../components/app/Layout";
import OneTimePageSpinner from "../components/app/OneTimePageSpinner";
import Spinner from "../components/app/Spinner";
import { useOneTimePageSpinner } from "../hooks/app/useOneTimePageSpinner";
import { useFeedPage } from "../hooks/pages/feed/useFeedPage";
import PullToRefresh from "react-simple-pull-to-refresh";
import { client } from "./_app";
import { Virtuoso } from "react-virtuoso";
import PostListRendererBeta from "../components/post/postListRendererBeta";
export default function Feed() {
  const { query, loadMoreElement, fetchMore } = useFeedPage();
  const { spinnerShown, setSpinnerShown } = useOneTimePageSpinner(query.data);

  return (
    <>
      <Layout title={"Feed | Orsive"}>
        <PullToRefresh
          pullingContent={""}
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
                  className="mb-1 overflow-hidden w-[90vw] md:max-w-3xl"
                  overscan={{
                    main: 200,
                    reverse: 200,
                  }}
                  data={query.data.getPosts.data}
                  endReached={fetchMore}
                  components={{
                    Footer: () => (
                      <>
                        {query.data.getPosts.hasNextPage && (
                          <div
                            className={`flex items-center justify-center m-2`}
                          >
                            <Spinner />
                          </div>
                        )}
                      </>
                    ),
                  }}
                  itemContent={(_index, post) => (
                    <PostListRendererBeta post={post} />
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
