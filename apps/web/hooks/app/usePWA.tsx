import { useEffect } from "react";
import firebase from "../../firebase";
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
      window.workbox !== undefined
    ) {
      // @ts-ignore
      const wb = window.workbox;

      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      // NOTE: MUST set skipWaiting to false in next.config.js pwa object
      // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
      const promptNewVersionAvailable = (event: any) => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        if (confirm("A new version of Orsive is available 🚀, wanna update?")) {
          wb.addEventListener("controlling", (event: any) => {
            window.location.reload();
          });

          // Send a message to the waiting service worker, instructing it to activate.
          wb.messageSkipWaiting();
        } else {
          console.log(
            "User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time."
          );
        }
      };

      wb.addEventListener("waiting", promptNewVersionAvailable);

      wb.register();
      const messaging = firebase.messaging();

      messaging
        .requestPermission()
        .then(() => {
          return messaging.getToken();
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
  }, []);
};
