import { NotificationLinkifyContent } from "./LinkifyContent";
import Link from "next/link";
import Image from "next/image";
import { nFormatter } from "./nFormatter";
import { UploadedBy } from "./types";

export function NotificationForPost(props: { notification: any }) {
  const uploadedBy: UploadedBy = props.notification.post.uploadedBy;
  return (
    <>
      <div className="md:flex items-center justify-center w-full my-2">
        <div
          className={`focus:outline-none lg:w-4/12 md:w-7/12 lg:mr-7 lg:mb-0 mb-7 p-6 shadow rounded ${
            props.notification.notification.seen
              ? "bg-slate-900"
              : "bg-slate-700"
          }`}
        >
          <div className="flex items-center border-b border-gray-700 pb-6 w-full">
            <div
              className="max-w-[20%] aspect-square"
              style={{
                position: "relative",
                minWidth: "2rem",
              }}
            >
              <Image
                alt={uploadedBy.username}
                src={uploadedBy.avatar}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-full"
                priority
              />
            </div>
            <div className="flex items-start justify-between w-full">
              <div className="pl-3 w-full">
                <p
                  tabIndex={0}
                  className="focus:outline-none text-lg font-medium leading-5"
                >
                  {uploadedBy.name}
                </p>
                <Link href={`/${uploadedBy.username}`} className="w-fit">
                  <span className="font-normal text-gray-300 hover:underline">
                    ${uploadedBy.username}
                  </span>
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

export function NotificationForComment(props: { notification: any }) {
  const uploadedBy: UploadedBy = props.notification.comment.post.uploadedBy;
  const notificationType = props.notification.notification.notificationType;
  return (
    <>
      <div className="lg:flex items-center justify-center w-full my-2">
        <div
          className={`focus:outline-none lg:w-4/12 md:w-7/12 lg:mr-7 lg:mb-0 mb-7 p-6 shadow rounded ${
            props.notification.notification.seen
              ? "bg-slate-900"
              : "bg-slate-700"
          }`}
        >
          <div className="flex items-center border-b border-gray-700 pb-6 w-full">
            <div
              className="max-w-[20%] aspect-square"
              style={{
                position: "relative",
                minWidth: "2rem",
              }}
            >
              <Image
                src={uploadedBy.avatar}
                alt={uploadedBy.username}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-full"
                priority
              />
            </div>
            <div className="flex items-start justify-between w-full">
              <div className="pl-3 w-full">
                <p
                  tabIndex={0}
                  className="focus:outline-none text-lg font-medium leading-5"
                >
                  {uploadedBy.name}
                </p>
                <Link href={`/${uploadedBy.username}`} className="w-fit">
                  <span className="font-normal text-gray-300 hover:underline">
                    ${uploadedBy.username}
                  </span>
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
                {uploadedBy.name}{" "}
                {notificationType === "forComment" ? (
                  <>commented on your post:</>
                ) : (
                  <>replied on your comment:</>
                )}
                {process.env.NEXT_PUBLIC_SITE_URL + props.notification.url}
              </p>
            </NotificationLinkifyContent>
          </div>
        </div>
      </div>
    </>
  );
}

export function NotificationForReputation(props: { notification: any }) {
  return (
    <>
      <div className="lg:flex items-center justify-center w-full my-2">
        <div
          className={`focus:outline-none lg:w-4/12 md:w-7/12 lg:mr-7 lg:mb-0 mb-7 p-6 shadow rounded ${
            props.notification.notification.seen
              ? "bg-slate-900"
              : "bg-slate-700"
          }`}
        >
          <div className="flex items-center border-b border-gray-700 pb-6 w-full">
            <div
              className="max-w-[20%] aspect-square"
              style={{
                position: "relative",
                minWidth: "2rem",
              }}
            >
              <Image
                alt={"Orsive"}
                src={"/maskable_icon.png"}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-full"
                priority
              />
            </div>
            <div className="flex items-start justify-between w-full">
              <div className="pl-3 w-full">
                <p
                  tabIndex={0}
                  className="focus:outline-none text-lg font-medium leading-5"
                >
                  Orsive
                </p>
              </div>
            </div>
          </div>
          <div className="px-2">
            <NotificationLinkifyContent>
              <p
                tabIndex={0}
                className="focus:outline-none text-md tracking-wide leading-5 py-4 text-gray-200"
              >
                You got {nFormatter(props.notification.amount, 2)} Reputation
              </p>
            </NotificationLinkifyContent>
          </div>
        </div>
      </div>
    </>
  );
}
