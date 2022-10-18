import classNames from "../../utils/classnames";

export default function PostCard(props: {
  onClick: () => void;
  icon: React.ReactNode;
  heading: string;
  description: string;
  comingSoon?: boolean;
}) {
  return (
    <div
      onClick={props.onClick}
      className="lg:flex items-center justify-center w-full m-2"
    >
      <div
        className={classNames(
          "focus:outline-none lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 p-6 shadow rounded",
          props.comingSoon
            ? "bg-gray-700 opacity-50 cursor-not-allowed"
            : "bg-gray-800 cursor-pointer"
        )}
      >
        <div className="flex items-center border-b border-gray-700 pb-6">
          {props.icon}
          <div className="flex items-start justify-between w-full">
            <div className="pl-3 w-full">
              <p
                tabIndex={0}
                className="focus:outline-none text-xl font-medium leading-5"
              >
                {props.heading}
              </p>
            </div>
          </div>
        </div>
        <div className="px-2">
          <p
            tabIndex={0}
            className="focus:outline-none text-md tracking-wide leading-5 py-4 text-gray-200"
          >
            {props.description}
          </p>
        </div>
        {props.comingSoon && (
          <div className="flex w-full justify-end">
            <p>Coming Soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
