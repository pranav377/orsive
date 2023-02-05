import EmptySVG from '../svgs/empty.svg';

export default function Empty(props: { message: string }) {
    return (
        <>
            <div className="flex h-full w-full flex-col justify-center self-center pb-24">
                <div className="flex w-full items-center justify-center">
                    <EmptySVG className="w-[80%] max-w-sm" />
                </div>
                <div className="m-2 flex max-w-xl flex-col self-center">
                    <span className="m-1 text-center text-2xl font-semibold">
                        {props.message}
                    </span>
                </div>
            </div>
        </>
    );
}
