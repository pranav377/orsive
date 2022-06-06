import { SearchIcon } from "@heroicons/react/solid";
import { ChangeEvent } from "react";

export default function SearchBar(props: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => any;
}) {
  return (
    <div className="p-5 w-full md:w-2/3 xl:w-2/3">
      <div className="flex w-full mb-2 rounded">
        <input
          onChange={props.onChange}
          type="search"
          className="form-control flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-slate-800 placeholder-gray-400 border focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-clip-padding rounded transition ease-in-out m-0"
          placeholder="Search Languages"
          aria-label="Search Languages"
        />
        <span className=" flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded">
          <SearchIcon className="w-7" />
        </span>
      </div>
    </div>
  );
}
