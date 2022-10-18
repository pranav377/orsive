import { useEffect } from "react";
import firebase, { PUBLIC_VAPID_KEY } from "../../firebase";
import { getMessaging, isSupported, getToken } from "firebase/messaging";
import { gql } from "@apollo/client";
import { client } from "../../pages/_app";

const UPDATE_NOTIFICATION_TOKEN_MUTATION = gql`
  mutation UpdateNotificationToken($token: String!) {
    updateNotificationToken(token: $token)
  }
`;

export const usePWA = () => {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      // @ts-ignore
      window.workbox !== undefined &&
      !/\bHeadlessChrome\//.test(navigator.userAgent)
    ) {
      // @ts-ignore
      const wb = window.workbox;

      wb.register();

      (async () => {
        if (await isSupported()) {
          const messaging = getMessaging(firebase);

          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              getToken(messaging, {
                vapidKey: PUBLIC_VAPID_KEY,
              })
                .then((token) => {
                  client
                    .mutate({
                      mutation: UPDATE_NOTIFICATION_TOKEN_MUTATION,
                      variables: { token },
                    })
                    .catch((err) => {});
                })
                .catch((err) => {});
            }
          });
        }
      })();
    }
  }, []);
};
