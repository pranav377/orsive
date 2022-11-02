import { useEffect, useState } from "react";
import USER_CHECK_QUERY, {
  getUnreadNotificationsQuery,
} from "../../logic/auth/queries/userCheck";
import { client } from "../../pages/_app";
import AdditionalSetup, { ADDITIONAL_SETUP_CONTEXT } from "./AdditionalSetup";
import LANG_CONF from "../../../../packages/config/global-lang-list.json";
import localforage from "localforage";
import { store } from "../../store";
import { UserStateActions } from "../../store/slices/userSlice";
import { AppStateActions } from "../../store/slices/appSlice";

export function setUser(user: {
  username: string;
  avatar: string;
  name: string;
  setupComplete: boolean;
  isMod: boolean;
  isStaff: boolean;
}) {
  localforage.setItem("username", user.username);
  store.dispatch(UserStateActions.login(user));
}

export function userCheckLogin() {
  client
    .query({
      query: USER_CHECK_QUERY,
    })
    .then((response) => {
      let data = response.data.me;

      setUser(data);
    })
    .catch((error) => {});
}

async function checkNotifications() {
  client
    .query({
      query: getUnreadNotificationsQuery,
      fetchPolicy: "network-only",
    })
    .then((response) => {
      store.dispatch(
        UserStateActions.setNotification(response.data.me.unreadNotifications)
      );
    })
    .catch((err) => {});
}

async function checkBionicMode() {
  if (typeof window! == "undefined" && localStorage) {
    let bionicMode = localStorage.getItem("bionic_mode");
    let isBionicMode = bionicMode === "true";

    store.dispatch(AppStateActions.setBionicMode(isBionicMode));
  }
}

export default function AppMiddleware() {
  useEffect(() => {
    userCheckLogin();
    checkBionicMode();
  }, []);

  useEffect(() => {
    checkNotifications();
  });

  const [allLangs, setAllLangs] = useState(LANG_CONF.langs);
  const [selectedLanguages, setSelectedLanguages] = useState<Array<string>>([]);
  const [selectionStore, setSelectionStore] = useState<
    Array<{
      name: string;
      on: boolean;
    }>
  >([]);

  return (
    <>
      <ADDITIONAL_SETUP_CONTEXT.Provider
        value={{
          allLangs,
          setAllLangs,
          selectedLanguages,
          setSelectedLanguages,
          selectionStore,
          setSelectionStore,
        }}
      >
        <AdditionalSetup />
      </ADDITIONAL_SETUP_CONTEXT.Provider>
    </>
  );
}
