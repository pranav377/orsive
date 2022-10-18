import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useScrollTop } from "../../hooks/app/useScrollTop";
import Spinner from "./Spinner";

interface TopBarPropTypes {
  backLink: string;
  content?: React.ReactNode;
  loading?: boolean;
  transparent?: boolean;
}

export default function TopBar(props: TopBarPropTypes) {
  useScrollTop();

  return (
    <div
      className={` p-2 md:p-3 w-full flex items-center fixed top-0 h-20 z-50 transition-colors duration-300 ${
        props.transparent ? "bg-transparent" : "bg-slate-900 bg-opacity-60"
      }`}
    >
      <Link
        scroll={props.backLink === "/feed" ? false : true}
        href={props.backLink}
        passHref
      >
        <a>
          <ArrowLeftIcon className="h-10 w-10 md:h-12 md:w-12 rounded-full p-2" />
        </a>
      </Link>
      <div
        className={`transition-opacity duration-300 ${
          props.transparent ? "opacity-0" : "opacity-100"
        }`}
      >
        {props.content}
      </div>
      {props.loading && (
        <span className="pl-5 font-bold text-xl">
          <Spinner />
        </span>
      )}
    </div>
  );
}

TopBar.defaultProps = {
  backLink: "/feed",
  transparent: false,
};
