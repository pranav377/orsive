import { Dispatch, SetStateAction, useState } from "react";

function Switch(props: {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}) {
  const toggleClass = "transform translate-x-full";

  return (
    <label
      className="flex items-center cursor-pointer"
      onClick={() => props.setToggle((prevState) => !prevState)}
    >
      <div className="relative">
        <div className={"sr-only"} />
        <div
          className={`block ${
            props.toggle ? "bg-blue-600" : "bg-gray-600"
          } w-12 h-6 rounded-full`}
        ></div>
        <div
          className={`${
            props.toggle && toggleClass
          } absolute left-1 top-1  w-4 h-4 rounded-full transition bg-white `}
        ></div>
      </div>
    </label>
  );
}

export default Switch;
