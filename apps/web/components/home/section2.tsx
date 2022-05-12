import { AnimationOnScroll } from "react-animation-on-scroll";
import { LightningBoltIcon } from "@heroicons/react/solid";
import PartySVG from "../svgs/party.svg";

export default function Section2() {
  return (
    <>
      <AnimationOnScroll animateIn="animate__fadeIn" animateOnce>
        <section className="lg:py-4 overflow-hidden lg:mt-20">
          <div className="container mx-auto pb-12">
            <div className="flex flex-wrap flex-col lg:flex-row-reverse justify-center">
              <div className="w-full lg:w-5/12 px-12 lg:px-4 ml-auto mr-auto flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className=" p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <LightningBoltIcon className="text-slate-900 w-10" />
                </div>
                <h3 className="text-2xl lg:text-3xl mb-2 font-semibold leading-normal text-white">
                  100% Open Source⚡
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-slate-100">
                  Orsive is an open source project. Feel free to send PRs and
                  Reviews.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-slate-100">
                  Get the code on Github and please help us spread the news with
                  a Star!
                </p>
                <a
                  href="https://github.com/orsive/orsive"
                  target="_blank"
                  rel="noreferrer"
                  className="github-star mt-4 inline-block text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-4 ripple-bg-slate-700 uppercase text-sm"
                >
                  Github Star
                </a>
              </div>
              <div className="w-full lg:w-5/12">
                <PartySVG
                  style={{
                    animation: "floating 4s ease-in-out infinite",
                  }}
                  className="p-4"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimationOnScroll>
    </>
  );
}
