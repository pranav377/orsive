import { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import classNames from '../../utils/classnames';
import Button from '../../base/button';
import DeleteModalDialog from '../../app/DeleteModalDialog';
import ShareModal from '../../app/ShareModalDialog';
import { useRouter } from 'next/router';
import ReportDialog from '../../app/ReportDialog';
import { useModPostDelete } from '../../../hooks/app/moderation/useModPostDelete';

export default function Options(props: {
    delete: () => Promise<any>;
    uploadedByUsername: string;
    url: string;
    canEdit?: boolean;
    postId: string;
}) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const router = useRouter();

    const { deletePostByMod } = useModPostDelete(props.postId);

    return (
        <>
            <DeleteModalDialog
                delete={props.delete}
                deletePostByMod={deletePostByMod}
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                uploadedByUsername={props.uploadedByUsername}
            />
            <ReportDialog
                postId={props.postId}
                open={reportOpen}
                setOpen={setReportOpen}
            />
            <ShareModal
                url={props.url}
                shareOpen={shareOpen}
                setShareOpen={setShareOpen}
            />
            <Menu as="div" className="relative ml-3 h-full w-full">
                <Menu.Button className=" w-full rounded-full p-2">
                    <DotsVerticalIcon />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-50 mt-1 w-48 origin-top-right rounded-md bg-slate-800 py-0 shadow-lg">
                        <Menu.Item>
                            {({ active }) => (
                                <Button
                                    onClick={() => setShareOpen(true)}
                                    className={classNames(
                                        active ? 'bg-slate-700' : '',
                                        'block w-full rounded-none bg-slate-800 px-4 py-2 text-left text-sm transition-all duration-300'
                                    )}
                                >
                                    Share
                                </Button>
                            )}
                        </Menu.Item>

                        {props.canEdit && (
                            <Menu.Item>
                                {({ active }) => (
                                    <Button
                                        onClick={() => {
                                            router.push(`/edit${props.url}`);
                                        }}
                                        className={classNames(
                                            active ? 'bg-slate-700' : '',
                                            'block w-full rounded-none bg-slate-800 px-4 py-2 text-left text-sm transition-all duration-300'
                                        )}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </Menu.Item>
                        )}
                        <Menu.Item>
                            {({ active }) => (
                                <Button
                                    onClick={() => setDeleteOpen(true)}
                                    className={classNames(
                                        active ? 'bg-slate-700' : '',
                                        'block w-full rounded-none bg-slate-800 px-4 py-2 text-left text-sm transition-all duration-300'
                                    )}
                                >
                                    Delete
                                </Button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Button
                                    onClick={() => setReportOpen(true)}
                                    className={classNames(
                                        active ? 'bg-slate-700' : '',
                                        'block w-full rounded-none bg-slate-800 px-4 py-2 text-left text-sm transition-all duration-300'
                                    )}
                                >
                                    Report
                                </Button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
}
