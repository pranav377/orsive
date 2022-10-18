import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useState } from "react";
import MainHead from "./subcomponents/MainHead";
import LanguageSelect from "./subcomponents/LanguageSelect";
import LANG_CONF from "../../../../../packages/config/global-lang-list.json";
import Button from "../../base/button";
import { ArrowRightIcon, XIcon } from "@heroicons/react/solid";
import SearchBar from "./subcomponents/SearchBar";
import Empty from "../Empty";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import SETUP_LANGUAGES_MUTATION from "./mutations/setupLanguagesMutation";
import { useRouter } from "next/router";
import { client } from "../../../pages/_app";
import { useUser } from "../../../hooks/auth/useUser";
import { useDispatch } from "react-redux";
import USER_CASES from "../../../app/store/reducers/user/cases";

export const ADDITIONAL_SETUP_CONTEXT = React.createContext<{
  allLangs: Array<string>;
  setAllLangs: React.Dispatch<React.SetStateAction<string[]>>;
  selectedLanguages: Array<string>;
  setSelectedLanguages: React.Dispatch<React.SetStateAction<string[]>>;
  selectionStore: Array<{
    name: string;
    on: boolean;
  }>;
  setSelectionStore: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        on: boolean;
      }[]
    >
  >;
}>({
  allLangs: [],
  setAllLangs: () => {},
  selectedLanguages: [],
  setSelectedLanguages: () => {},
  selectionStore: [],
  setSelectionStore: () => {},
});

export default function AdditionalSetup() {
  const user = useUser();
  const dispatch = useDispatch();

  function closeModal() {
    dispatch({ type: USER_CASES.SETUP_COMPLETE });
  }

  const additionalSetupState = useContext(ADDITIONAL_SETUP_CONTEXT);

  const [setupLanguagesMutation] = useMutation(SETUP_LANGUAGES_MUTATION);
  const router = useRouter();

  return (
    <>
      <Transition show={!user.setupComplete} as={Fragment}>
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

                      additionalSetupState.setAllLangs(
                        LANG_CONF.langs.filter((lang) =>
                          lang
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                        )
                      );
                    }}
                  />
                  <Button
                    disabled={
                      additionalSetupState.selectedLanguages.length === 0
                    }
                    onClick={() => {
                      toast
                        .promise(
                          setupLanguagesMutation({
                            variables: {
                              langs: additionalSetupState.selectedLanguages,
                            },
                          }),
                          {
                            loading: "Updating preferences...",
                            success: "Updated preferences",
                            error: "Something went wrong. Try again",
                          }
                        )
                        .then(() => {
                          closeModal();
                          client.cache.reset();
                          client.resetStore();
                          router.push("/feed");
                        });
                    }}
                    className="ripple-bg-blue-800 mt-3"
                  >
                    <span className="flex items-center gap-1">
                      Continue <ArrowRightIcon className="w-4 h-4" />
                    </span>
                  </Button>
                  <h3 className="text-xl">Select 1 or more languages:</h3>
                  <div className="w-full gap-1 mt-3 flex justify-center flex-wrap">
                    {additionalSetupState.allLangs.map((language, idx) => (
                      <div className="w-full md:w-1/4 mb-3" key={idx}>
                        <LanguageSelect language={language} />
                      </div>
                    ))}
                    {additionalSetupState.allLangs.length === 0 && (
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
