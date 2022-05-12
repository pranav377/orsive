import { NotificationType } from "../../pages/notifications";
import { NotificationLinkifyContent } from "./LinkifyContent";
import Link from "next/link";

export default function Notification(props: {
  notification: NotificationType;
}) {
  const uploadedBy = props.notification.post.uploadedBy;
  return (
    <>
      <div className="lg:flex items-center justify-center w-full my-2">
        <div
          className={`focus:outline-none lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 p-6 shadow rounded ${
            props.notification.notification.seen
              ? "bg-slate-900"
              : "bg-slate-700"
          }`}
        >
          <div className="flex items-center border-b border-gray-700 pb-6 w-full">
            <img
              src={uploadedBy.avatar}
              style={{
                minWidth: "2rem",
                minHeight: "2rem",
              }}
              className="flex rounded-full object-cover object-center max-w-[20%] aspect-square"
            />
            <div className="flex items-start justify-between w-full">
              <div className="pl-3 w-full">
                <p
                  tabIndex={0}
                  className="focus:outline-none text-lg font-medium leading-5"
                >
                  {uploadedBy.name}
                </p>
                <Link href={`/${uploadedBy.username}`}>
                  <a className="w-fit">
                    <span className="font-normal text-gray-300 hover:underline">
                      ${uploadedBy.username}
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="px-2">
            <NotificationLinkifyContent>
              <p
                tabIndex={0}
                className="focus:outline-none text-md tracking-wide leading-5 py-4 text-gray-200"
              >
                {uploadedBy.name} uploaded a new post:
                {process.env.NEXT_PUBLIC_SITE_URL + props.notification.url}
              </p>
            </NotificationLinkifyContent>
          </div>
        </div>
      </div>
    </>
  );
}
