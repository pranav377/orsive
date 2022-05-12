import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { ExclamationIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import ModalDialog from "../../app/Dialog";
import classNames from "../../utils/classnames";
import Button from "../../base/button";
import toast from "react-hot-toast";
import { useUser } from "../../../hooks/auth/useUser";
import { useDispatch } from "react-redux";
import CONTENT_CASES from "../../../app/store/reducers/content/cases";

export default function Options(props: {
  delete: () => Promise<any>;
  uploadedByUsername: string;
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const user = useUser();
  const dispatch = useDispatch();

  return (
    <>
      <ModalDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
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
                dispatch({ type: CONTENT_CASES.SHOW_LOGIN_DIALOG });
              } else if (user.username !== props.uploadedByUsername) {
                toast.error("You don't own the post😑");
              } else {
                toast
                  .promise(props.delete(), {
                    loading: "Deleting....",
                    success: "Deleted Successfully",
                    error: "Unable to delete",
                  })
                  .then(() => {
                    setDeleteOpen(false);
                  });
              }
            }}
            className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 ripple-bg-red-600 text-base font-medium sm:ml-3 sm:w-auto sm:text-sm"
          >
            Delete
          </Button>
        }
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
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-slate-800 z-50">
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
            <Menu.Item>
              {() => (
                <Button
                  darkText
                  className={classNames(
                    "block px-4 py-2 text-sm bg-slate-800 transition-all duration-300 disabled"
                  )}
                >
                  Edit (coming soon)
                </Button>
              )}
            </Menu.Item>
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
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
