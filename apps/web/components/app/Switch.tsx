import { Dispatch, SetStateAction, useState } from 'react';

function Switch(props: {
    toggle: boolean;
    setToggle: Dispatch<SetStateAction<boolean>>;
}) {
    const toggleClass = 'transform translate-x-full';

    return (
        <label
            className="flex cursor-pointer items-center"
            onClick={() => props.setToggle((prevState) => !prevState)}
        >
            <div className="relative">
                <div className={'sr-only'} />
                <div
                    className={`block ${
                        props.toggle ? 'bg-blue-600' : 'bg-gray-600'
                    } h-6 w-12 rounded-full`}
                ></div>
                <div
                    className={`${
                        props.toggle && toggleClass
                    } absolute left-1 top-1  h-4 w-4 rounded-full bg-white transition `}
                ></div>
            </div>
        </label>
    );
}

export default Switch;
