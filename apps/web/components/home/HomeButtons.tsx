import Button from "../base/button";
import GoogleSVG from "../svgs/google-color-logo.svg";
import DiscordSVG from "../svgs/discord-color-logo.svg";
import { InboxIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { DISCORD_AUTH_URL, GOOGLE_AUTH_URL } from "../../config";
import Link from "next/link";

export default function HomeButtons() {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center mt-5 gap-2 home">
      <Button
        onClick={() => router.push(GOOGLE_AUTH_URL)}
        className="ripple-bg-white text-black rounded-3xl flex items-center justify-center gap-2 w-56"
      >
        <GoogleSVG className="w-5 h-6" />
        Login with Google
      </Button>
      <Button
        onClick={() => router.push(DISCORD_AUTH_URL)}
        className="ripple-bg-slate-700 flex rounded-3xl items-center justify-center gap-2 w-56"
      >
        <DiscordSVG className="w-6 h-6" />
        Login with Discord
      </Button>
      <Button
        onClick={() => router.push("/auth")}
        className="ripple-bg-blue-700 flex rounded-3xl items-center justify-center gap-2 w-56"
      >
        <InboxIcon className="w-6 h-6" />
        Login with Email
      </Button>

      <span className="flex items-center justify-center w-full font-medium">
        Or
      </span>

      <Link
        href={"/feed"}
        passHref
        className="ripple-bg-blue-700 p-2 font-medium flex rounded-3xl items-center justify-center gap-2 w-56"
      >
        Explore
      </Link>

      <Button
        onClick={() => router.push("/auth?page=signup")}
        className="mt-5 font-semibold"
      >
        Wanna be a Smarty Capty? Sign Up
      </Button>
    </div>
  );
}
