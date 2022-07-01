import { useEffect, useState } from "react";
import USER_CHECK_QUERY, {
  getUnreadNotificationsQuery,
} from "../../app/auth/queries/userCheck";
import { client } from "../../pages/_app";
import USER_CASES from "../../app/store/reducers/user/cases";
import store from "../../app/store/store";
import APP_CASES from "../../app/store/reducers/app/cases";
import AdditionalSetup, { ADDITIONAL_SETUP_CONTEXT } from "./AdditionalSetup";
import LANG_CONF from "../../../../packages/config/global-lang-list.json";

export function setUser(user: {
  username: string;
  avatar: string;
  name: string;
  setupComplete: boolean;
  isMod: boolean;
  isStaff: boolean;
}) {
  localStorage.setItem("username", user.username);
  store.dispatch({
    type: USER_CASES.LOGIN,
    payload: user,
  });
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
      store.dispatch({
        type: USER_CASES.SET_NOTIFICATIONS,
        payload: {
          unreadNotifications: response.data.me.unreadNotifications,
        },
      });
    })
    .catch((err) => {});
}

async function checkBionicMode() {
  if (typeof window! == "undefined" && localStorage) {
    let bionicMode = localStorage.getItem("bionic_mode");

    if (typeof bionicMode === "boolean") {
      store.dispatch({
        type: APP_CASES.SET_BIONIC_MODE,
        payload: { bionicMode },
      });
    }
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
