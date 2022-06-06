import LogoSVG from "../../../svgs/logo.svg";

export default function MainHead() {
  return (
    <div className="flex flex-col items-center wobble">
      <LogoSVG className="w-20 h-20" />
      <span className="font-semibold text-4xl">Welcome to Orsive</span>
    </div>
  );
}
