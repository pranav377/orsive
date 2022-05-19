import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import classNames from "../../utils/classnames";
import Button from "../../base/button";
import DeleteModalDialog from "../../app/DeleteModalDialog";
import ShareModal from "../../app/ShareModalDialog";
import { useRouter } from "next/router";

export default function Options(props: {
  delete: () => Promise<any>;
  uploadedByUsername: string;
  url: string;
  canEdit?: boolean;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <DeleteModalDialog
        delete={props.delete}
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        uploadedByUsername={props.uploadedByUsername}
      />
      <ShareModal
        url={props.url}
        shareOpen={shareOpen}
        setShareOpen={setShareOpen}
      />
      <Menu as="div" className="ml-3 relative w-full h-full">
        <Menu.Button className=" rounded-full p-2 w-full">
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
          <Menu.Items className="origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg py-0 bg-slate-800 z-50">
            <Menu.Item>
              {({ active }) => (
                <Button
                  onClick={() => setShareOpen(true)}
                  className={classNames(
                    active ? "bg-slate-700" : "",
                    "block w-full text-left rounded-none px-4 py-2 text-sm bg-slate-800 transition-all duration-300"
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
                      active ? "bg-slate-700" : "",
                      "block w-full text-left rounded-none px-4 py-2 text-sm bg-slate-800 transition-all duration-300"
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
                    active ? "bg-slate-700" : "",
                    "block w-full text-left rounded-none px-4 py-2 text-sm bg-slate-800 transition-all duration-300"
                  )}
                >
                  Delete
                </Button>
              )}
            </Menu.Item>
            <Menu.Item>
              {() => (
                <Button
                  darkText
                  className={classNames(
                    "block px-4 py-2 text-sm bg-slate-800 transition-all duration-300 disabled"
                  )}
                >
                  Report (coming soon)
                </Button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
