import classNames from '../../utils/classnames';

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
            className="m-2 w-full items-center justify-center lg:flex"
        >
            <div
                className={classNames(
                    'mb-7 rounded p-6 shadow focus:outline-none lg:mr-7 lg:mb-0 lg:w-4/12',
                    props.comingSoon
                        ? 'cursor-not-allowed bg-gray-700 opacity-50'
                        : 'cursor-pointer bg-gray-800'
                )}
            >
                <div className="flex items-center border-b border-gray-700 pb-6">
                    {props.icon}
                    <div className="flex w-full items-start justify-between">
                        <div className="w-full pl-3">
                            <p
                                tabIndex={0}
                                className="text-xl font-medium leading-5 focus:outline-none"
                            >
                                {props.heading}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="px-2">
                    <p
                        tabIndex={0}
                        className="text-md py-4 leading-5 tracking-wide text-gray-200 focus:outline-none"
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
