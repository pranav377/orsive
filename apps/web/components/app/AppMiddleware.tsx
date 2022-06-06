import { useEffect } from "react";
import USER_CHECK_QUERY, {
  getUnreadNotificationsQuery,
} from "../../app/auth/queries/userCheck";
import { client } from "../../pages/_app";
import USER_CASES from "../../app/store/reducers/user/cases";
import store from "../../app/store/store";
import { gql } from "@apollo/client";
import { removeCookies, setCookies } from "cookies-next";
import { USER_COOKIE_KEY } from "../../config";
import localforage from "localforage";
import APP_CASES from "../../app/store/reducers/app/cases";
import AdditionalSetup from "./AdditionalSetup";

export function setUser(user: {
  username: string;
  avatar: string;
  name: string;
  setupComplete: boolean;
  isMod: boolean;
  isStaff: boolean;
}) {
  setCookies(USER_COOKIE_KEY, "true", {
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  localforage.setItem("username", user.username);
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
    .catch((error) => {
      removeCookies(USER_COOKIE_KEY);
    });
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
  let bionicMode = await localforage.getItem("bionic_mode");

  if (typeof bionicMode === "boolean") {
    store.dispatch({
      type: APP_CASES.SET_BIONIC_MODE,
      payload: { bionicMode },
    });
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

  return (
    <>
      <AdditionalSetup />
    </>
  );
}
