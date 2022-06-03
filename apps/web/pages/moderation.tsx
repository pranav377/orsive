import VirtualScroller from "virtual-scroller/react";
import { Layout } from "../components/app/Layout";
import OneTimePageSpinner from "../components/app/OneTimePageSpinner";
import Spinner from "../components/app/Spinner";
import AccessDenied from "../components/forms/content/accessDenied";
import ModerationImagePostCard from "../components/moderation/ModerationImagePostCard";
import ModerationOrsicPostCard from "../components/moderation/ModerationOrsicPostCard";
import { useModeration } from "../hooks/app/moderation/useModeration";
import { useOneTimePageSpinner } from "../hooks/app/useOneTimePageSpinner";
import NotifySVG from "../components/svgs/notify.svg";

export default function Moderation() {
  const { user, query, loadMoreElement } = useModeration();
  const { spinnerShown, setSpinnerShown } = useOneTimePageSpinner(query.data);

  return (
    <>
      <Layout title={"Moderation Bay | Orsive"}>
        <div className="flex items-center mb-1 flex-col">
          {!user.is && (
            <div className="h-[60vh] md:h-[90vh] flex">
              <AccessDenied />
            </div>
          )}

          {user.is && !user.isMod && (
            <div className="h-[60vh] md:h-[80vh] flex">
              <div className="flex flex-col self-center w-full h-full justify-center">
                <div className="w-full flex items-center justify-center">
                  <NotifySVG className="w-full max-w-sm" />
                </div>
                <div className="flex flex-col m-2 max-w-xl self-center">
                  <span className="font-semibold text-2xl m-1">
                    You are not a Mod
                  </span>
                </div>
              </div>
            </div>
          )}

          {user.is && user.isMod && (
            <OneTimePageSpinner
              long
              data={query.data}
              spinnerShown={spinnerShown}
            />
          )}

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
        </div>
      </Layout>
    </>
  );
}
