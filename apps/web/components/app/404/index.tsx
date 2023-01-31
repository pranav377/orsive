import Link from 'next/link';
import { useHomeUrl } from '../../../hooks/app/useHomeUrl';
import { Layout } from '../Layout';

export default function Comp404() {
    let homeUrl = useHomeUrl();
    return (
        <>
            <Layout title="404 not found | Orsive">
                <div
                    className="-mb-24 
    h-screen overflow-hidden"
                >
                    <div
                        className="
        
    flex
    h-full
    w-screen
    items-center
    justify-center
    bg-gradient-to-r
    from-slate-800
    to-slate-900
  "
                    >
                        <div className="rounded-md bg-slate-800 px-4 py-20 shadow-xl lg:px-36">
                            <div className="flex flex-col items-center">
                                <h1 className="text-9xl font-bold text-blue-600">
                                    404
                                </h1>

                                <h6 className="mb-2 text-center text-2xl font-bold md:text-3xl">
                                    <span className="text-red-500">Oops!</span>{' '}
                                    Page not found
                                </h6>

                                <p className="mb-8 text-center text-gray-200 md:text-lg">
                                    The page you're looking for doesn't exist.
                                </p>

                                <Link
                                    href={homeUrl}
                                    passHref
                                    className="ripple-bg-blue-100 rounded-md px-6 py-2 text-sm font-semibold text-blue-800"
                                >
                                    Go back to home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
