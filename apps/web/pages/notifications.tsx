import Empty from "../components/app/Empty";
import { Layout } from "../components/app/Layout";
import Notification from "../components/app/Notification";
import OneTimePageSpinner from "../components/app/OneTimePageSpinner";
import PostCards from "../components/app/PostCard/PostCards";
import Spinner from "../components/app/Spinner";
import AccessDenied from "../components/forms/content/accessDenied";
import { useNotifications } from "../hooks/app/notifications/useNotifications";
import { useOneTimePageSpinner } from "../hooks/app/useOneTimePageSpinner";

export interface NotificationType {
  post: {
    uploadedBy: {
      avatar: string;
      username: string;
      name: string;
    };
  };
  notification: {
    seen: boolean;
    createdAt: Date;
  };
  url: string;
}

export default function Notifications() {
  const { notificationsQuery, user, loadMoreElement } = useNotifications();

  const { spinnerShown } = useOneTimePageSpinner(notificationsQuery.data);

  return (
    <>
      <Layout title={"Notifications | Orsive"}>
        <div className="mt-3 flex items-center flex-col">
          {!user.is && (
            <div className="h-[60vh] md:h-[90vh] flex">
              <AccessDenied />
            </div>
          )}

          {notificationsQuery.data && (
            <>
              <PostCards>
                <>
                  {notificationsQuery.data.getMyNotifications.data.map(
                    (notification: NotificationType, idx: number) => {
                      return (
                        <Notification notification={notification} key={idx} />
                      );
                    }
                  )}
                </>
              </PostCards>

              {notificationsQuery.data.getMyNotifications.hasNextPage && (
                <div
                  ref={loadMoreElement}
                  className={`flex items-center justify-center m-2 ${
                    !notificationsQuery.data && "h-[70vh]"
                  }`}
                >
                  <Spinner />
                </div>
              )}
              {notificationsQuery.data.getMyNotifications.data.length === 0 &&
                user.is && (
                  <div className="pt-20 w-full">
                    <Empty message="No notifications" />
                  </div>
                )}
            </>
          )}

          {user.is && (
            <OneTimePageSpinner
              spinnerShown={spinnerShown}
              data={notificationsQuery.data}
              long
            />
          )}
        </div>
      </Layout>
    </>
  );
}
