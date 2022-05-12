import Link from "next/link";
import { useHomeUrl } from "../../../hooks/app/useHomeUrl";
import { Layout } from "../Layout";

export default function Comp404() {
  let homeUrl = useHomeUrl();
  return (
    <>
      <Layout title="404 not found | Orsive">
        <div
          className="overflow-hidden 
    h-screen -mb-24"
        >
          <div
            className="
        
    flex
    items-center
    justify-center
    w-screen
    h-full
    bg-gradient-to-r
    from-slate-800
    to-slate-900
  "
          >
            <div className="px-4 lg:px-36 py-20 bg-slate-800 rounded-md shadow-xl">
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-blue-600 text-9xl">404</h1>

                <h6 className="mb-2 text-2xl font-bold text-center md:text-3xl">
                  <span className="text-red-500">Oops!</span> Page not found
                </h6>

                <p className="mb-8 text-center text-gray-200 md:text-lg">
                  The page you're looking for doesn't exist.
                </p>

                <Link href={homeUrl} passHref>
                  <a className="px-6 py-2 text-sm font-semibold text-blue-800 ripple-bg-blue-100 rounded-md">
                    Go back to home
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
