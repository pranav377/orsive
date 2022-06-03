import VirtualScroller from "virtual-scroller/react";
import { Layout } from "../components/app/Layout";
import OneTimePageSpinner from "../components/app/OneTimePageSpinner";
import Spinner from "../components/app/Spinner";
import ModerationImagePostCard from "../components/moderation/ModerationImagePostCard";
import ModerationOrsicPostCard from "../components/moderation/ModerationOrsicPostCard";
import { useModeration } from "../hooks/app/moderation/useModeration";
import { useOneTimePageSpinner } from "../hooks/app/useOneTimePageSpinner";

export default function Moderation() {
  const { query, loadMoreElement } = useModeration();
  const { spinnerShown, setSpinnerShown } = useOneTimePageSpinner(query.data);

  return (
    <>
      <Layout title={"Moderation Bay | Orsive"}>
        <div className="flex items-center mb-1 flex-col">
          {query.data && (
            <>
              <VirtualScroller
                className="flex flex-col items-center"
                items={query.data.getReports.data}
                itemComponent={function ListRenderer(props: { children: any }) {
                  const report = props.children;
                  if (report.post.__typename === "Image") {
                    return (
                      <ModerationImagePostCard
                        report={report}
                        key={report.post.post.id}
                      />
                    );
                  }
                  if (report.post.__typename === "Orsic") {
                    return (
                      <ModerationOrsicPostCard
                        report={report}
                        key={report.post.post.id}
                      />
                    );
                  }

                  return null;
                }}
              />
              {query.data.getReports.hasNextPage && (
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
