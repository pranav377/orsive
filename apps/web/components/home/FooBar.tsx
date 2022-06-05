import Link from "next/link";

export default function FooBar() {
  return (
    <footer className="text-center bg-gray-900 text-white absolute bottom-0 w-full">
      <div
        className="text-center p-2"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <div className="flex gap-1 justify-center mb-2">
          <Link href="https://github.com/pranav377/orsive" passHref>
            <a className="text-blue-700 hover:underline hover:text-blue-800 ">
              Github
            </a>
          </Link>
        </div>
        © Orsive
      </div>
    </footer>
  );
}
