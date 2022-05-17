import type { NextPage } from "next";
import Section1 from "../components/home/section1";
import Section2 from "../components/home/section2";

import "animate.css/animate.min.css";
import { Layout } from "../components/app/Layout";
import { useAuthRedirect } from "../hooks/app/useAuthRedirect";

const Home: NextPage = () => {
  useAuthRedirect();
  return (
    <>
      <Layout title={"Home | Orsive"}>
        <Section1 />
        <Section2 />
      </Layout>
    </>
  );
};

export default Home;
