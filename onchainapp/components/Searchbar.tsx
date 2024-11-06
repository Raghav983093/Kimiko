import React from "react";

export const Searchbar: React.FC = () => {
    // const handleSearch = (arg: React.ChangeEvent<HTMLInputElement>) => {

    // }

    return (
        <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-slate-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </span>
            <input 
                type="text" 
                name="search" 
                id="Search" 
                placeholder="What are you looking for?"
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                // className="bg-kimwhite p-2 rounded-lg text-xs text-kimnavy active:shadow-inner focus:border-none"
                // onChange={(e) => handleSearch(e)}
            />
        </label>
    )
}