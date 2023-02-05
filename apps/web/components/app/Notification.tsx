import { NotificationLinkifyContent } from './LinkifyContent';
import Link from 'next/link';
import Image from 'next/image';
import { nFormatter } from './nFormatter';
import { UploadedBy } from './types';

export function NotificationForPost(props: { notification: any }) {
    const uploadedBy: UploadedBy = props.notification.post.uploadedBy;
    return (
        <>
            <div className="my-2 w-full items-center justify-center md:flex">
                <div
                    className={`mb-7 rounded p-6 shadow focus:outline-none md:w-7/12 lg:mr-7 lg:mb-0 lg:w-4/12 ${
                        props.notification.notification.seen
                            ? 'bg-slate-900'
                            : 'bg-slate-700'
                    }`}
                >
                    <div className="flex w-full items-center border-b border-gray-700 pb-6">
                        <div
                            className="aspect-square max-w-[20%]"
                            style={{
                                position: 'relative',
                                minWidth: '2rem',
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
                        <div className="flex w-full items-start justify-between">
                            <div className="w-full pl-3">
                                <p
                                    tabIndex={0}
                                    className="text-lg font-medium leading-5 focus:outline-none"
                                >
                                    {uploadedBy.name}
                                </p>
                                <Link
                                    href={`/${uploadedBy.username}`}
                                    className="w-fit"
                                >
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
                                className="text-md py-4 leading-5 tracking-wide text-gray-200 focus:outline-none"
                            >
                                {uploadedBy.name} uploaded a new post:
                                {process.env.NEXT_PUBLIC_SITE_URL +
                                    props.notification.url}
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
            <div className="my-2 w-full items-center justify-center lg:flex">
                <div
                    className={`mb-7 rounded p-6 shadow focus:outline-none md:w-7/12 lg:mr-7 lg:mb-0 lg:w-4/12 ${
                        props.notification.notification.seen
                            ? 'bg-slate-900'
                            : 'bg-slate-700'
                    }`}
                >
                    <div className="flex w-full items-center border-b border-gray-700 pb-6">
                        <div
                            className="aspect-square max-w-[20%]"
                            style={{
                                position: 'relative',
                                minWidth: '2rem',
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
                        <div className="flex w-full items-start justify-between">
                            <div className="w-full pl-3">
                                <p
                                    tabIndex={0}
                                    className="text-lg font-medium leading-5 focus:outline-none"
                                >
                                    {uploadedBy.name}
                                </p>
                                <Link
                                    href={`/${uploadedBy.username}`}
                                    className="w-fit"
                                >
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
                                className="text-md py-4 leading-5 tracking-wide text-gray-200 focus:outline-none"
                            >
                                {uploadedBy.name}{' '}
                                {notificationType === 'forComment' ? (
                                    <>commented on your post:</>
                                ) : (
                                    <>replied on your comment:</>
                                )}
                                {process.env.NEXT_PUBLIC_SITE_URL +
                                    props.notification.url}
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
            <div className="my-2 w-full items-center justify-center lg:flex">
                <div
                    className={`mb-7 rounded p-6 shadow focus:outline-none md:w-7/12 lg:mr-7 lg:mb-0 lg:w-4/12 ${
                        props.notification.notification.seen
                            ? 'bg-slate-900'
                            : 'bg-slate-700'
                    }`}
                >
                    <div className="flex w-full items-center border-b border-gray-700 pb-6">
                        <div
                            className="aspect-square max-w-[20%]"
                            style={{
                                position: 'relative',
                                minWidth: '2rem',
                            }}
                        >
                            <Image
                                alt={'Orsive'}
                                src={'/maskable_icon.png'}
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                                className="rounded-full"
                                priority
                            />
                        </div>
                        <div className="flex w-full items-start justify-between">
                            <div className="w-full pl-3">
                                <p
                                    tabIndex={0}
                                    className="text-lg font-medium leading-5 focus:outline-none"
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
                                className="text-md py-4 leading-5 tracking-wide text-gray-200 focus:outline-none"
                            >
                                You got{' '}
                                {nFormatter(props.notification.amount, 2)}{' '}
                                Reputation
                            </p>
                        </NotificationLinkifyContent>
                    </div>
                </div>
            </div>
        </>
    );
}
