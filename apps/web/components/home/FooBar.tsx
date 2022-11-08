import Link from "next/link";

export default function FooBar() {
  return (
    <footer className="text-center bg-gray-900 text-white absolute bottom-0 w-full">
      <div
        className="text-center p-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <div className="flex gap-4 justify-center mb-2">
          <Link
            href="https://github.com/pranav377/orsive"
            passHref
            className="text-blue-700 hover:underline hover:text-blue-800 "
          >
            Github
          </Link>

          {/* <Link
            href="/terms-and-conditions"
            passHref
            className="text-blue-700 hover:underline hover:text-blue-800 "
          >
            Terms And Conditions
          </Link>

          <Link
            href="/privacy"
            passHref
            className="text-blue-700 hover:underline hover:text-blue-800 "
          >
            Privacy Policy
          </Link> */}
        </div>
        © Orsive
      </div>
    </footer>
  );
}
