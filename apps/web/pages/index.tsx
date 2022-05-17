import type { NextPage } from "next";
import Section1 from "../components/home/section1";
import Section2 from "../components/home/section2";

import "animate.css/animate.min.css";
import { Layout } from "../components/app/Layout";
import { useHome } from "../hooks/pages/useHome";
import Spinner from "../components/app/Spinner";

const Home: NextPage = () => {
  const { loading } = useHome();

  return (
    <>
      <Layout title={"Home | Orsive"}>
        {loading ? (
          <>
            <div className={`flex items-center justify-center m-2 h-[70vh]`}>
              <Spinner />
            </div>
          </>
        ) : (
          <>
            <Section1 />
            <Section2 />
          </>
        )}
      </Layout>
    </>
  );
};

export default Home;
