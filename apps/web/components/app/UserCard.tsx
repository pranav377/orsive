import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { Transition } from "@headlessui/react";

export default function UserCard(props: {
  user: {
    avatar: string;
    name: string;
    username: string;
  };
}) {
  const count = useQuery(gql`
    query GetProfileCount {
      getUser(username: "${props.user.username}") {
        _count {
        followers
        following
      }
      }
    }
  `);
  return (
    <div className="w-[95%] md:w-2/4 lg:w-1/4 my-2 p-3 rounded-lg border shadow-md bg-gray-800 border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 w-24 h-24 rounded-full shadow-lg"
          src={props.user.avatar}
          alt={props.user.name}
        />
        <h5 className="mb-1 text-xl font-medium">{props.user.name}</h5>
        <Link href={`/${props.user.username}`}>
          <a>
            <span className="text-sm text-gray-300">
              ${props.user.username}
            </span>
          </a>
        </Link>
        {count.data ? (
          <Transition
            appear
            show
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <div className="flex p-1 h-8">
              <span className="text-sm text-gray-400 m-1">
                {count.data.getUser._count.followers} followers
              </span>
              <span className="text-sm text-gray-400 m-1">
                {count.data.getUser._count.following} following
              </span>
            </div>
          </Transition>
        ) : (
          <div className="p-1 h-8" />
        )}
        <div className="flex mt-4 space-x-3 lg:mt-6">
          <Link href={`/${props.user.username}`}>
            <a className="inline-flex items-center py-2 px-4 text-sm font-medium text-center rounded-lg ripple-bg-blue-600">
              View Profile
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
