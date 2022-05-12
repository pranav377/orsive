import { useEffect, useRef } from "react";
import Link from "next/link";
import Typed from "typed.js";
import LogoSVG from "../svgs/logo.svg";

export default function Section1() {
  const peopleListEl = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(peopleListEl.current!, {
      strings: [
        "Pros",
        "Noobs",
        "Students",
        "Introverts",
        "Extroverts",
        "Everyone",
      ], // Strings to display
      // Speed settings, try diffrent values untill you get good results
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 100,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="leading-normal tracking-normal text-indigo-400 m-6 bg-cover bg-fixed">
      <div className="h-full">
        <div className="container mx-auto flex flex-wrap flex-col-reverse lg:flex-row items-center animate__animated animate__zoomInDown">
          <div className=" flex flex-col w-full lg:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <h1 className=" my-4 text-3xl lg:text-4xl text-white font-bold leading-tight text-center lg:text-left">
              The
              <span className="bg-clip-text mx-2 text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700">
                social media platform
              </span>
              for <span ref={peopleListEl}></span>
            </h1>
            <p className=" leading-normal text-base lg:text-2xl mb-8 text-center lg:text-left">
              An open source social media platform made for everyone
            </p>

            <div className="bg-gray-900 self-center lg:self-start shadow-lg rounded-lg px-8 pt-6 pb-8 mb-9">
              <div className="flex items-center justify-center">
                <Link href={`/auth?page=signup`} passHref>
                  <a className="ripple-bg-blue-700 p-2 rounded-md text-base lg:text-xl text-white">
                    Sign Up🚀
                  </a>
                </Link>
                <span className="text-white font-semibold mx-3">Or</span>
                <Link href={"/feed"} passHref>
                  <a className="ripple-bg-slate-700 p-2 rounded-md text-base lg:text-xl text-white">
                    Explore
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="block w-full lg:w-3/5">
            <LogoSVG
              style={{
                display: "block",
                margin: "0 auto",
                animation: "floating 7s ease-in-out infinite",
              }}
              width="100%"
              height="100%"
              className="sm:w-6/12 lg:w-4/12 xl:w-4/12 max-w-[40%]  "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
