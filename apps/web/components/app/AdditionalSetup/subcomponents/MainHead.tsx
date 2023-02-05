import LogoSVG from '../../../svgs/logo.svg';

export default function MainHead() {
    return (
        <div className="wobble flex flex-col items-center">
            <LogoSVG className="h-20 w-20" />
            <span className="animate__animated animate__bounceInRight text-3xl font-semibold md:text-4xl">
                Welcome to <span className="text-blue-600  ">Orsive</span>
            </span>
        </div>
    );
}
