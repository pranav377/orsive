import LogoSVG from "../../../svgs/logo.svg";

export default function MainHead() {
  return (
    <div className="flex flex-col items-center wobble">
      <LogoSVG className="w-20 h-20" />
      <span className="font-semibold text-3xl md:text-4xl animate__animated animate__bounceInRight">
        Welcome to <span className="text-blue-600  ">Orsive</span>
      </span>
    </div>
  );
}
