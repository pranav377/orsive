import Empty from '../components/app/Empty';
import { Layout } from '../components/app/Layout';
import {
    NotificationForComment,
    NotificationForPost,
    NotificationForReputation,
} from '../components/app/Notification';
import OneTimePageSpinner from '../components/app/OneTimePageSpinner';
import PostCards from '../components/app/PostCard/PostCards';
import Spinner from '../components/app/Spinner';
import AccessDenied from '../components/forms/content/accessDenied';
import { useNotifications } from '../hooks/app/notifications/useNotifications';
import { useOneTimePageSpinner } from '../hooks/app/useOneTimePageSpinner';

export default function Notifications() {
    const { notificationsQuery, user, loadMoreElement } = useNotifications();

    const { spinnerShown } = useOneTimePageSpinner(notificationsQuery.data);

    return (
        <>
            <Layout title={'Notifications | Orsive'}>
                <div className="mt-3 flex flex-col items-center">
                    {!user.is && (
                        <div className="flex h-[60vh] md:h-[90vh]">
                            <AccessDenied />
                        </div>
                    )}

                    {notificationsQuery.data && (
                        <>
                            <PostCards>
                                <>
                                    {notificationsQuery.data.getMyNotifications.data.map(
                                        (notification: any, idx: number) => {
                                            const notificationType =
                                                notification.notification
                                                    .notificationType;
                                            if (
                                                notificationType === 'forPost'
                                            ) {
                                                return (
                                                    <NotificationForPost
                                                        notification={
                                                            notification
                                                        }
                                                        key={idx}
                                                    />
                                                );
                                            } else if (
                                                (notificationType ===
                                                    'forComment' ||
                                                    notificationType ===
                                                        'forReply') &&
                                                notification.url
                                            ) {
                                                return (
                                                    <NotificationForComment
                                                        notification={
                                                            notification
                                                        }
                                                        key={idx}
                                                    />
                                                );
                                            } else if (
                                                notificationType ===
                                                'forReputation'
                                            ) {
                                                return (
                                                    <NotificationForReputation
                                                        notification={
                                                            notification
                                                        }
                                                        key={idx}
                                                    />
                                                );
                                            } else {
                                                return null;
                                            }
                                        }
                                    )}
                                </>
                            </PostCards>

                            {notificationsQuery.data.getMyNotifications
                                .hasNextPage && (
                                <div
                                    ref={loadMoreElement}
                                    className={`m-2 flex items-center justify-center ${
                                        !notificationsQuery.data && 'h-[70vh]'
                                    }`}
                                >
                                    <Spinner />
                                </div>
                            )}
                            {notificationsQuery.data.getMyNotifications.data
                                .length === 0 &&
                                user.is && (
                                    <div className="w-full pt-20">
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
