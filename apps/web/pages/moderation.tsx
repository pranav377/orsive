import { Layout } from '../components/app/Layout';
import OneTimePageSpinner from '../components/app/OneTimePageSpinner';
import Spinner from '../components/app/Spinner';
import AccessDenied from '../components/forms/content/accessDenied';
import { useModeration } from '../hooks/app/moderation/useModeration';
import { useOneTimePageSpinner } from '../hooks/app/useOneTimePageSpinner';
import NotifySVG from '../components/svgs/notify.svg';
import { Virtuoso } from 'react-virtuoso';
import ModerationPostListRenderer from '../components/post/moderationPostListRenderer';

export default function Moderation() {
    const { user, query, fetchMore, objIdx, setObj } = useModeration();
    const { spinnerShown } = useOneTimePageSpinner(query.data);

    return (
        <>
            <Layout title={'Moderation Bay | Orsive'}>
                <div className="mb-1 flex flex-col items-center">
                    {!user.is && (
                        <div className="flex h-[60vh] md:h-[90vh]">
                            <AccessDenied />
                        </div>
                    )}

                    {user.is && !user.isMod && (
                        <div className="flex h-[60vh] md:h-[80vh]">
                            <div className="flex h-full w-full flex-col justify-center self-center">
                                <div className="flex w-full items-center justify-center">
                                    <NotifySVG className="w-full max-w-sm" />
                                </div>
                                <div className="m-2 flex max-w-xl flex-col self-center">
                                    <span className="m-1 text-2xl font-semibold">
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
                                className="mb-1 w-[90vw] overflow-hidden md:max-w-3xl"
                                overscan={{
                                    main: 200,
                                    reverse: 200,
                                }}
                                data={query.data.getReports.data}
                                endReached={fetchMore}
                                components={{
                                    Footer: () => (
                                        <>
                                            {query.data.getReports
                                                .hasNextPage && (
                                                <div
                                                    className={`m-2 flex items-center justify-center`}
                                                >
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
