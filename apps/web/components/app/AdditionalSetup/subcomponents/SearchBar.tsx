import { SearchIcon } from '@heroicons/react/solid';
import { ChangeEvent } from 'react';

export default function SearchBar(props: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => any;
}) {
    return (
        <div className="w-full p-5 md:w-2/3 xl:w-2/3">
            <div className="mb-2 flex w-full rounded">
                <input
                    onChange={props.onChange}
                    type="search"
                    className="form-control m-0 block w-full min-w-0 flex-auto rounded border bg-slate-800 bg-clip-padding px-3 py-1.5 text-base font-normal placeholder-gray-400 transition ease-in-out focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Search Languages"
                    aria-label="Search Languages"
                />
                <span className=" flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-gray-700">
                    <SearchIcon className="w-7" />
                </span>
            </div>
        </div>
    );
}
