import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { Transition } from '@headlessui/react';

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
        <div className="my-2 w-[95%] rounded-lg border border-gray-700 bg-gray-800 p-3 shadow-md md:w-2/4 lg:w-1/4">
            <div className="flex flex-col items-center pb-10">
                <img
                    className="mb-3 h-24 w-24 rounded-full shadow-lg"
                    src={props.user.avatar}
                    alt={props.user.name}
                />
                <h5 className="mb-1 text-xl font-medium">{props.user.name}</h5>
                <Link
                    href={`/${props.user.username}`}
                    className="text-sm text-gray-300"
                >
                    ${props.user.username}
                </Link>
                {count.data ? (
                    <Transition
                        appear
                        show
                        enter="transition-opacity duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                    >
                        <div className="flex h-8 p-1">
                            <span className="m-1 text-sm text-gray-400">
                                {count.data.getUser._count.followers} followers
                            </span>
                            <span className="m-1 text-sm text-gray-400">
                                {count.data.getUser._count.following} following
                            </span>
                        </div>
                    </Transition>
                ) : (
                    <div className="h-8 p-1" />
                )}
                <div className="mt-4 flex space-x-3 lg:mt-6">
                    <Link
                        href={`/${props.user.username}`}
                        className="ripple-bg-blue-600 inline-flex items-center rounded-lg py-2 px-4 text-center text-sm font-medium"
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
