import { ExclamationIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useUser } from '../../hooks/auth/useUser';
import { ContentStateActions } from '../../store/slices/contentSlice';
import Button from '../base/button';
import ModalDialog from './Dialog';

export default function DeleteModalDialog(props: {
    deleteOpen: boolean;
    setDeleteOpen: any;
    uploadedByUsername: string;
    delete: any;
    deletePostByMod: any;
}) {
    const user = useUser();
    const dispatch = useDispatch();

    return (
        <ModalDialog
            open={props.deleteOpen}
            setOpen={props.setDeleteOpen}
            icon={
                <ExclamationIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                />
            }
            heading="Delete"
            description="Are you sure you want to delete this?"
            button={
                <Button
                    onClick={() => {
                        if (!user.is) {
                            dispatch(
                                ContentStateActions.setShowLoginDialog(true)
                            );
                        } else if (user.isMod) {
                            toast
                                .promise(props.deletePostByMod(), {
                                    loading: 'Deleting....',
                                    success: 'Deleted Successfully',
                                    error: 'Unable to delete',
                                })
                                .then(() => {
                                    props.setDeleteOpen(false);
                                });
                        } else if (user.username !== props.uploadedByUsername) {
                            toast.error("You don't own the post😑");
                        } else {
                            toast
                                .promise(props.delete(), {
                                    loading: 'Deleting....',
                                    success: 'Deleted Successfully',
                                    error: 'Unable to delete',
                                })
                                .then(() => {
                                    props.setDeleteOpen(false);
                                });
                        }
                    }}
                    className="ripple-bg-red-600 inline-flex w-full justify-center rounded-md px-4 py-2 text-base font-medium shadow-sm sm:ml-3 sm:w-auto sm:text-sm"
                >
                    Delete
                </Button>
            }
        />
    );
}
