import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

type LayoutProps = {
    children: React.ReactNode;
    title?: string;
};

const Layout = ({ children, title }: LayoutProps) => {
    const { asPath } = useRouter();

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
            </Head>
            {title && (
                <NextSeo
                    title={title}
                    openGraph={{
                        title,
                    }}
                />
            )}
            <motion.main
                key={asPath}
                initial={{ opacity: 0, x: -200, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -200, y: 0 }}
                className="overflow-x-hidden"
                transition={{
                    x: { type: 'tween', stiffness: 100 },
                    duration: 0.8,
                    delay: 0.2,
                }}
            >
                <div className="mb-24">{children}</div>
            </motion.main>
        </>
    );
};

export { Layout };
