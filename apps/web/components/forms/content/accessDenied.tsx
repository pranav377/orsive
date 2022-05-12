import AccessDeniedSvg from "../../svgs/access_denied.svg";
import Link from "next/link";
import Button from "../../base/button";

export default function AccessDenied() {
  return (
    <>
      <div className="flex flex-col self-center w-full h-full justify-center">
        <div className="w-full flex items-center justify-center">
          <AccessDeniedSvg className="w-[80%] max-w-sm" />
        </div>
        <div className="flex flex-col m-2 max-w-xl self-center">
          <span className="font-semibold text-2xl m-1">
            Please login to continue
          </span>
          <Link href="/auth" passHref>
            <a>
              <Button className="bg-blue-600 hover:bg-blue-700 ripple-bg-blue-600 w-full">
                Login
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
