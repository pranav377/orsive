import EmptySVG from "../svgs/empty.svg";

export default function Empty(props: { message: string }) {
  return (
    <>
      <div className="flex flex-col self-center w-full h-full justify-center pb-24">
        <div className="w-full flex items-center justify-center">
          <EmptySVG className="w-[80%] max-w-sm" />
        </div>
        <div className="flex flex-col m-2 max-w-xl self-center">
          <span className="font-semibold text-2xl m-1">{props.message}</span>
        </div>
      </div>
    </>
  );
}
