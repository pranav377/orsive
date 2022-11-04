import { Layout } from "../components/app/Layout";
import OneTimePageSpinner from "../components/app/OneTimePageSpinner";
import Spinner from "../components/app/Spinner";
import AccessDenied from "../components/forms/content/accessDenied";
import { useModeration } from "../hooks/app/moderation/useModeration";
import { useOneTimePageSpinner } from "../hooks/app/useOneTimePageSpinner";
import NotifySVG from "../components/svgs/notify.svg";
import { Virtuoso } from "react-virtuoso";
import ModerationPostListRenderer from "../components/post/moderationPostListRenderer";

export default function Moderation() {
  const { user, query, fetchMore, objIdx, setObj } = useModeration();
  const { spinnerShown } = useOneTimePageSpinner(query.data);

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
              <Virtuoso
                useWindowScroll
                {...(objIdx && {
                  initialTopMostItemIndex: objIdx,
                })}
                className="mb-1 overflow-hidden w-[90vw] md:max-w-3xl"
                overscan={{
                  main: 200,
                  reverse: 200,
                }}
                data={query.data.getReports.data}
                endReached={fetchMore}
                components={{
                  Footer: () => (
                    <>
                      {query.data.getReports.hasNextPage && (
                        <div className={`flex items-center justify-center m-2`}>
                          <Spinner />
                        </div>
                      )}
                    </>
                  ),
                }}
                itemContent={(thisObjIdx, report) => (
                  <ModerationPostListRenderer
                    report={report}
                    objIdx={thisObjIdx}
                    setObj={setObj}
                  />
                )}
              />
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
