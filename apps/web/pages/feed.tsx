import { Layout } from "../components/app/Layout";
import OneTimePageSpinner from "../components/app/OneTimePageSpinner";
import Spinner from "../components/app/Spinner";
import ImagePostCard from "../components/post/cards/ImagePostCard";
import OrsicPostCard from "../components/post/cards/OrsicPostCard";
import { useOneTimePageSpinner } from "../hooks/app/useOneTimePageSpinner";
import { useScrollRestoring } from "../hooks/app/useScrollRestoring";
import { useFeedPage } from "../hooks/pages/feed/useFeedPage";

export default function Feed() {
  const { query, loadMoreElement } = useFeedPage();

  const { spinnerShown } = useOneTimePageSpinner(query.data);

  useScrollRestoring();

  return (
    <>
      <Layout title={"Feed | Orsive"}>
        <div className="flex items-center mb-1 flex-col">
          {query.data && (
            <>
              {query.data.getPosts.data.map((post: any) => {
                if (post.__typename === "Image") {
                  return <ImagePostCard post={post} key={post.post.id} />;
                }
                if (post.__typename === "Orsic") {
                  return <OrsicPostCard post={post} key={post.post.id} />;
                }
              })}

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
      </Layout>
    </>
  );
}
