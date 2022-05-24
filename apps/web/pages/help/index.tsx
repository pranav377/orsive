import { Layout } from "../../components/app/Layout";
import BugSVG from "../../components/svgs/bug.svg";
import { LightBulbIcon, BriefcaseIcon } from "@heroicons/react/solid";

export default function HelpCenter() {
  return (
    <Layout title="Help Center | Orsive">
      <span className="w-full flex justify-center my-5 text-2xl">
        What can we do for you?
      </span>
      <div className="w-full flex justify-center flex-wrap gap-2">
        <div className="w-[12rem] flex flex-col items-center justify-center font-semibold bg-slate-900 p-9 rounded-md">
          <BugSVG className="fill-gray-300" />
          Bug Report
        </div>
        <div className="w-[12rem] flex flex-col items-center justify-center font-semibold bg-slate-900 p-9 rounded-md">
          <LightBulbIcon className="fill-gray-300 w-12 h-12" />
          Feature Request
        </div>
        <div className="w-[12rem] flex flex-col items-center justify-center font-semibold bg-slate-900 p-9 rounded-md">
          <BriefcaseIcon className="fill-gray-300 w-12 h-12" />
          Business Inquiry
        </div>
      </div>
    </Layout>
  );
}
