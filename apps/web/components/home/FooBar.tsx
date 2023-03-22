import Link from 'next/link';

export default function FooBar() {
    return (
        <footer className="absolute bottom-0 w-full bg-gray-900 text-center text-white">
            <div
                className="p-2 text-center"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            >
                <div className="mb-2 flex justify-center gap-4">
                    <Link
                        href="https://github.com/pranav377/orsive"
                        className="text-blue-700 hover:text-blue-800 hover:underline "
                    >
                        Github
                    </Link>

                    {/* <Link
            href="/terms-and-conditions"
             
            className="text-blue-700 hover:underline hover:text-blue-800 "
          >
            Terms And Conditions
          </Link>

          <Link
            href="/privacy"
             
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
