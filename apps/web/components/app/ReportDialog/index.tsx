import { useMutation } from '@apollo/client';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '../../../hooks/auth/useUser';
import Button from '../../base/button';
import AccessDenied from '../../forms/content/accessDenied';
import ModalDialog from '../Dialog';
import ADD_REPORT_MUTATION from './AddReportMutation';

type ReportReason = 'sus_spam' | 'sensitive_content' | 'harmful';

export default function ReportDialog(props: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    postId: string;
}) {
    const user = useUser();
    const [addReportMutation] = useMutation(ADD_REPORT_MUTATION);

    const report = (reason: ReportReason) => {
        toast
            .promise(
                addReportMutation({
                    variables: {
                        postId: props.postId,
                        reason,
                    },
                }),
                {
                    loading: 'Reporting...',
                    error: 'Post was already reported',
                    success: 'Reported successfully!',
                }
            )
            .catch((err) => err)
            .finally(() => props.setOpen(false));
    };

    return (
        <>
            <ModalDialog
                open={props.open}
                setOpen={props.setOpen}
                content={
                    <>
                        {user.is ? (
                            <>
                                <span className="font-semibold">
                                    What's the problem with this post?
                                </span>

                                <div className="mt-3 flex w-full flex-col items-start gap-1">
                                    <Button
                                        onClick={() => report('sus_spam')}
                                        className="ripple-bg-slate-900 w-full"
                                    >
                                        It's Suspicious/Spam
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            report('sensitive_content')
                                        }
                                        className="ripple-bg-slate-900 w-full"
                                    >
                                        It displays sensitive content
                                    </Button>
                                    <Button
                                        onClick={() => report('harmful')}
                                        className="ripple-bg-slate-900 w-full"
                                    >
                                        It's harmful
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <AccessDenied />
                        )}
                    </>
                }
            />
        </>
    );
}
