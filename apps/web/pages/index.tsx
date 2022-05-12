import type { GetServerSideProps, NextPage } from "next";
import Section1 from "../components/home/section1";
import Section2 from "../components/home/section2";

import "animate.css/animate.min.css";
import { Layout } from "../components/app/Layout";
import { USER_COOKIE_KEY } from "../config";
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

function getCook(cookiename: string, cookieString: string) {
  var cookiestring = RegExp(cookiename + "=[^;]+").exec(cookieString);
  return decodeURIComponent(
    !!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : ""
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (getCook(USER_COOKIE_KEY, req.headers.cookie!) === "true") {
    return {
      redirect: {
        permanent: false,
        destination: "/feed",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};
