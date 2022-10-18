import { Layout } from "../components/app/Layout";
import OneTimePageSpinner from "../components/app/OneTimePageSpinner";
import Spinner from "../components/app/Spinner";
import ImagePostCard from "../components/post/cards/ImagePostCard";
import OrsicPostCard from "../components/post/cards/OrsicPostCard";
import { useOneTimePageSpinner } from "../hooks/app/useOneTimePageSpinner";
import { useScrollRestoring } from "../hooks/app/useScrollRestoring";
import { useFeedPage } from "../hooks/pages/feed/useFeedPage";
import PullToRefresh from "react-simple-pull-to-refresh";
import { client } from "./_app";
import VirtualScroller from "virtual-scroller/react";

export default function Feed() {
  const { query, loadMoreElement } = useFeedPage();
  const { spinnerShown, setSpinnerShown } = useOneTimePageSpinner(query.data);
  useScrollRestoring();

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
          <div className="flex items-center mb-1 flex-col">
            {query.data && (
              <>
                <VirtualScroller
                  className="flex flex-col items-center"
                  items={query.data.getPosts.data}
                  itemComponent={function ListRenderer(props: {
                    children: any;
                  }) {
                    const post = props.children;
                    if (post.__typename === "Image") {
                      return <ImagePostCard post={post} key={post.post.id} />;
                    }
                    if (post.__typename === "Orsic") {
                      return <OrsicPostCard post={post} key={post.post.id} />;
                    }

                    return null;
                  }}
                />
                {query.data.getPosts.hasNextPage && (
                  <div
                    ref={loadMoreElement}
                    className={`flex items-center justify-center m-2`}
                  >
                    <Spinner />
                  </div>
                )}
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
