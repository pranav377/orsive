import AccessDeniedSvg from '../../svgs/access_denied.svg';
import Link from 'next/link';
import Button from '../../base/button';

export default function AccessDenied() {
    return (
        <>
            <div className="flex h-full w-full flex-col justify-center self-center">
                <div className="flex w-full items-center justify-center">
                    <AccessDeniedSvg className="w-[80%] max-w-sm" />
                </div>
                <div className="m-2 flex max-w-xl flex-col self-center">
                    <span className="m-1 text-2xl font-semibold">
                        Please login to continue
                    </span>
                    <Link href="/auth">
                        <Button className="ripple-bg-blue-600 w-full bg-blue-600 hover:bg-blue-700">
                            Login
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
