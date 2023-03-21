import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import BottomNavigation from '../components/navigation/bottom';
import Navbar from '../components/navigation/navbar';
import { GRAPHQL_URL } from '../config';
import AppMiddleware from '../components/app/AppMiddleware';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import _ from 'lodash';
import { createUploadLink } from 'apollo-upload-client';
import { DefaultSeo } from 'next-seo';
import NextNProgress from 'nextjs-progressbar';
import LoginDialog from '../components/app/LoginDialog';
import { useAnalytics } from '../hooks/app/useAnalytics';
import { AnimatePresence } from 'framer-motion';

import { usePWA } from '../hooks/app/usePWA';
import { setContext } from '@apollo/client/link/context';
import { store } from '../store';
import {
    StyledEngineProvider,
    ThemeProvider,
    createTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const authLink = setContext((_, { headers }) => {
    let token;

    if (typeof window !== 'undefined' && window.localStorage) {
        token = localStorage.getItem('token');
    }

    return {
        headers: {
            ...headers,
            ...(token && {
                authorization: `Bearer ${token}`,
            }),
        },
    };
});

export const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    getPosts: {
                        keyArgs: false,
                        merge(existing = { data: [] }, incoming) {
                            return {
                                data: _.uniqBy(
                                    [...existing.data, ...incoming.data],
                                    'slug'
                                ),
                                hasNextPage: incoming.hasNextPage,
                                nextPage: incoming.nextPage,
                            };
                        },
                    },
                    getFollowingPosts: {
                        keyArgs: false,
                        merge(existing = { data: [] }, incoming) {
                            return {
                                data: _.uniqBy(
                                    [...existing.data, ...incoming.data],
                                    'slug'
                                ),
                                hasNextPage: incoming.hasNextPage,
                                nextPage: incoming.nextPage,
                            };
                        },
                    },
                    getMyNotifications: {
                        keyArgs: false,
                        merge(existing = { data: [] }, incoming) {
                            return {
                                data: _.uniqBy(
                                    [...existing.data, ...incoming.data],
                                    '__ref'
                                ),
                                hasNextPage: incoming.hasNextPage,
                                nextPage: incoming.nextPage,
                            };
                        },
                    },
                    getReports: {
                        keyArgs: false,
                        merge(existing = { data: [] }, incoming) {
                            return {
                                data: _.uniqBy(
                                    [...existing.data, ...incoming.data],
                                    '__ref'
                                ),
                                hasNextPage: incoming.hasNextPage,
                                nextPage: incoming.nextPage,
                            };
                        },
                    },
                    getProfilePosts: {
                        keyArgs: false,
                        merge(existing = { data: [] }, incoming) {
                            return {
                                data: _.uniqBy(
                                    [...existing.data, ...incoming.data],
                                    'post.__ref'
                                ),
                                hasNextPage: incoming.hasNextPage,
                                nextPage: incoming.nextPage,
                            };
                        },
                    },
                    getComments: {
                        keyArgs: false,
                        merge(existing = { data: [] }, incoming) {
                            return {
                                data: _.uniqBy(
                                    [...existing.data, ...incoming.data],
                                    '__ref'
                                ),
                                hasNextPage: incoming.hasNextPage,
                                nextPage: incoming.nextPage,
                            };
                        },
                    },
                    getReplies: {
                        keyArgs: false,
                        merge(existing = { data: [] }, incoming) {
                            return {
                                data: _.uniqBy(
                                    [...existing.data, ...incoming.data],
                                    'post.__ref'
                                ),
                                hasNextPage: incoming.hasNextPage,
                                nextPage: incoming.nextPage,
                            };
                        },
                    },
                },
            },
        },
    }),
    link: authLink.concat(
        createUploadLink({
            uri: GRAPHQL_URL,
        })
    ),
});

function Web({ Component, pageProps, router }: AppProps) {
    const url = `https://www.orsive.com${router.route}`;
    useAnalytics();
    usePWA();

    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />

                        <AppMiddleware />
                        <Toaster
                            position="bottom-center"
                            reverseOrder={false}
                            containerStyle={{
                                zIndex: 99999999,
                            }}
                            toastOptions={{
                                style: {
                                    zIndex: 99999999,
                                },
                            }}
                        />
                        <DefaultSeo
                            additionalLinkTags={[
                                {
                                    rel: 'shortcut icon',
                                    href: '/logo.png',
                                    type: 'image/x-icon',
                                },
                                {
                                    rel: 'icon',
                                    href: '/logo.png',
                                    type: 'image/x-icon',
                                },
                            ]}
                            openGraph={{
                                type: 'website',
                                locale: 'en_US',
                                url: 'https://www.orsive.com/',
                                title: 'Orsive',
                                description:
                                    'An open source social media platform',
                                site_name: 'Orsive',
                                images: [
                                    {
                                        url: 'https://www.orsive.com/logo.png',
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
                        <AnimatePresence initial={false} mode="wait">
                            <Component {...pageProps} key={url} />
                        </AnimatePresence>

                        <BottomNavigation />
                    </ThemeProvider>
                </StyledEngineProvider>
            </ApolloProvider>
        </Provider>
    );
}

export default Web;
