import { useEffect } from "react";
import USER_CHECK_QUERY from "../../app/auth/queries/userCheck";
import { client } from "../../pages/_app";
import USER_CASES from "../../app/store/reducers/user/cases";
import store from "../../app/store/store";
import { gql } from "@apollo/client";
import FEATURES_CASES from "../../app/store/reducers/features/cases";
import { removeCookies, setCookies } from "cookies-next";
import { USER_COOKIE_KEY } from "../../config";
import { useAppState } from "../../hooks/app/useAppState";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import APP_CASES from "../../app/store/reducers/app/cases";

export function setUser(user: {
  username: string;
  avatar: string;
  unreadNotifications: boolean;
}) {
  setCookies(USER_COOKIE_KEY, "true", {
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
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
      console.error(error);
      removeCookies(USER_COOKIE_KEY);
    });
}

async function checkFeatures() {
  let response = await client.query({
    query: gql`
      query {
        features {
          name
          status
        }
      }
    `,
  });

  store.dispatch({
    type: FEATURES_CASES.SET_FEATURES,
    payload: response.data.features,
  });
}

export default function AppMiddleware() {
  const appState = useAppState();
  const router = useRouter();
  const disptach = useDispatch();

  useEffect(() => {
    userCheckLogin();
    checkFeatures();
  }, []);

  useEffect(() => {
    window.addEventListener("online", () => {
      disptach({ type: APP_CASES.SET_OFFLINE, payload: { offline: false } });
    });

    window.addEventListener("offline", () => {
      disptach({ type: APP_CASES.SET_OFFLINE, payload: { offline: true } });
    });
  });

  if (appState.offline) {
    router.push("/_offline");
  }

  return null;
}
