import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import BottomNavigation from "../components/navigation/bottom";
import Navbar from "../components/navigation/navbar";
import { GRAPHQL_URL } from "../config";
import AppMiddleware from "../components/app/AppMiddleware";
import { Provider } from "react-redux";
import store from "../app/store/store";
import { Toaster } from "react-hot-toast";
import _ from "lodash";
import { createUploadLink } from "apollo-upload-client";
import { DefaultSeo } from "next-seo";
import NextNProgress from "nextjs-progressbar";
import { AnimatePresence } from "framer-motion";
import LoginDialog from "../components/app/LoginDialog";
import { useAnalytics } from "../hooks/app/useAnalytics";

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPosts: {
            keyArgs: false,
            merge(existing = { data: [] }, incoming) {
              return {
                data: _.uniqBy([...existing.data, ...incoming.data], "slug"),
                hasNextPage: incoming.hasNextPage,
              };
            },
          },
          getMyNotifications: {
            keyArgs: false,
            merge(existing = { data: [] }, incoming) {
              return {
                data: _.uniqBy([...existing.data, ...incoming.data], "__ref"),
                hasNextPage: incoming.hasNextPage,
              };
            },
          },
          getProfilePosts: {
            keyArgs: false,
            merge(existing = { data: [] }, incoming) {
              return {
                data: _.uniqBy(
                  [...existing.data, ...incoming.data],
                  "post.__ref"
                ),
                hasNextPage: incoming.hasNextPage,
              };
            },
          },
          getComments: {
            keyArgs: false,
            merge(existing = { data: [] }, incoming) {
              return {
                data: _.uniqBy([...existing.data, ...incoming.data], "__ref"),
                hasNextPage: incoming.hasNextPage,
              };
            },
          },
          getReplies: {
            keyArgs: false,
            merge(existing = { data: [] }, incoming) {
              return {
                data: _.uniqBy(
                  [...existing.data, ...incoming.data],
                  "post.__ref"
                ),
                hasNextPage: incoming.hasNextPage,
              };
            },
          },
        },
      },
    },
  }),
  link: createUploadLink({
    uri: GRAPHQL_URL,
    credentials: "include",
  }),
});

function Web({ Component, pageProps, router }: AppProps) {
  const url = `https://www.orsive.com${router.route}`;
  useAnalytics();

  return (
    <>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <AppMiddleware />
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            containerStyle={{
              zIndex: 99999999, // For the container
            }}
            toastOptions={{
              style: {
                zIndex: 99999999, // For toasts
              },
            }}
          />
          <DefaultSeo
            additionalLinkTags={[
              {
                rel: "shortcut icon",
                href: "/logo.png",
                type: "image/x-icon",
              },
              {
                rel: "icon",
                href: "/logo.png",
                type: "image/x-icon",
              },
            ]}
            openGraph={{
              type: "website",
              locale: "en_US",
              url: "https://www.orsive.com/",
              title: "Orsive",
              description: "An open source social media platform",
              site_name: "Orsive",
              images: [
                {
                  url: "https://www.orsive.com/logo.png",
                },
              ],
            }}
          />
          <Navbar />
          <NextNProgress
            showOnShallow={false}
            options={{
              showSpinner: false,
            }}
          />
          <LoginDialog />
          <AnimatePresence initial={false} exitBeforeEnter>
            <Component {...pageProps} key={url} />
          </AnimatePresence>

          <BottomNavigation />
        </ApolloProvider>
      </Provider>
    </>
  );
}

export default Web;
