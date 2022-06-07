import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import MainHead from "./subcomponents/MainHead";
import LanguageSelect from "./subcomponents/LanguageSelect";
import { langs as AllLangs } from "../../../../../packages/config/global-lang-list.json";
import Button from "../../base/button";
import { ArrowRightIcon } from "@heroicons/react/solid";
import SearchBar from "./subcomponents/SearchBar";
import Empty from "../Empty";

export default function AdditionalSetup() {
  let [isOpen, setIsOpen] = useState(true);
  const [langs, setLangs] = useState(AllLangs);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-hidden"
          onClose={closeModal}
        >
          <div className="min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full h-screen p-6 overflow-y-scroll overflow-x-hidden align-middle transition-all transform bg-slate-900">
                <div className="h-full w-full flex flex-col items-center">
                  <MainHead />
                  <SearchBar
                    onChange={(e) => {
                      e.preventDefault();

                      setLangs(
                        AllLangs.filter((lang) =>
                          lang
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                        )
                      );
                    }}
                  />
                  <Button disabled className="bg-blue-800 mt-3">
                    <span className="flex items-center gap-1">
                      Continue <ArrowRightIcon className="w-4 h-4" />
                    </span>
                  </Button>
                  <h3 className="text-xl">Select your preferred languages:</h3>
                  <div className="w-full gap-1 mt-3 flex justify-center flex-wrap">
                    {langs.map((language, idx) => (
                      <div className="w-full md:w-1/4 mb-3" key={idx}>
                        <LanguageSelect language={language} />
                      </div>
                    ))}
                    {langs.length === 0 && (
                      <div className="mt-3">
                        <Empty message="No languages found" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
