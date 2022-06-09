import type { NextPage } from "next";

import { Layout } from "../components/app/Layout";
import { useHome } from "../hooks/pages/useHome";
import Spinner from "../components/app/Spinner";
import Hero from "../components/home/Hero";
import LogoSVG from "../components/svgs/logo.svg";
import HomeButtons from "../components/home/HomeButtons";
import FooBar from "../components/home/FooBar";

const Home: NextPage = () => {
  // const { loading } = useHome();

  return (
    <>
      {/* <Layout title={"Home | Orsive"}>
        {loading ? (
          <>
            <div className={`flex items-center justify-center m-2 h-[70vh]`}>
              <Spinner />
            </div>
          </>
        ) : (
          <>
            <div className="relative h-screen -mb-24">
              <Hero />
              <div className="w-full flex flex-col items-center mt-20 mb-20 home">
                <LogoSVG className="w-32 floating" />
                <span className="text-4xl text-center text-gray-200 font-semibold w-8/12">
                  Welcome to Orsive
                </span>
                <span className="text-gray-400 text-center">
                  An open source social media platform
                </span>
                <HomeButtons />
              </div>
              <FooBar />
            </div>
          </>
        )}
      </Layout> */}
    </>
  );
};

export default Home;
