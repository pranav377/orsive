import { Metadata } from 'next';
import Script from 'next/script';

import './globals.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MUISetup from './MUISetup';

export const metadata: Metadata = {
    title: 'Orsive',
    description: 'An open source social media platform',

    icons: {
        icon: '/logo.png',
        shortcut: '/logo.png',
        apple: '/icons/apple-icon.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/icons/apple-touch-icon-precomposed.png',
        },
    },

    openGraph: {
        type: 'website',
        locale: 'en-US',
        url: 'https://www.orsive.com/',
        title: 'Orsive',
        description: 'An open source social media platform',
        siteName: 'Orsive',
        images: [
            {
                url: 'https://www.orsive.com/logo.png',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <MUISetup>{children}</MUISetup>
            <Script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />

            <Script
                id="gtag-init"
                dangerouslySetInnerHTML={{
                    __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
            `,
                }}
            />
        </html>
    );
}
