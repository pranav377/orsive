import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../base/button";

export default function ModalDialog(props: {
  open: boolean;
  setOpen: any;
  icon?: React.ReactNode;
  heading?: string;
  description?: React.ReactNode;
  content?: React.ReactNode;
  button?: React.ReactNode;
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {props.icon && (
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 sm:mx-0 sm:h-10 sm:w-10">
                      {props.icon}
                    </div>
                  )}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium"
                    >
                      {props.heading}
                    </Dialog.Title>
                    <div className="mt-2 w-full">
                      {props.content}
                      <p className="text-sm text-gray-200 w-full">
                        {props.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {props.button}
                <Button
                  className="mt-3 w-full inline-flex justify-center shadow-sm px-4 py-2 ripple-bg-slate-700 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => props.setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Nevermind
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
