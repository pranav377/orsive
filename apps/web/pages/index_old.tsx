import type { NextPage } from 'next';

import { Layout } from '../components/app/Layout';
import { useHome } from '../hooks/pages/useHome';
import Spinner from '../components/app/Spinner';
import LogoSVG from '../components/svgs/logo.svg';
import HomeButtons from '../components/home/HomeButtons';
import FooBar from '../components/home/FooBar';

const Home: NextPage = () => {
    const { loading } = useHome();

    return (
        <>
            <Layout title={'Home | Orsive'}>
                {loading ? (
                    <>
                        <div
                            className={`m-2 flex h-[70vh] items-center justify-center`}
                        >
                            <Spinner />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="relative -mb-24 h-screen">
                            <div className="home mt-20 mb-20 flex w-full flex-col items-center">
                                <LogoSVG className="floating w-32" />
                                <span className="w-8/12 text-center text-4xl font-semibold text-gray-200">
                                    Welcome to <h1>Orsive</h1>
                                </span>
                                <span className="text-center text-gray-400">
                                    An open source social media platform
                                </span>
                                <HomeButtons />
                            </div>
                            <FooBar />
                        </div>
                    </>
                )}
            </Layout>
        </>
    );
};

export default Home;
