import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import React from "react";

const searchData = [
  {
    title: "Python",
  },
  {
    title: "JavaScript",
  },
  {
    title: "ReactJS",
  },
  {
    title: "Hacking",
  },
  {
    title: "Learn TailwindCSS",
  },
  {
    title: "Python Free",
  },
];

function PopularSearch() {
  return (
    <>
      <div className="max-w-[25%] w-full flex flex-col items-center px-5 py-10">
        <h1 className="text-lg font-semibold text-secondary">Popular Search</h1>
        <div className="flex flex-col gap-3 mt-4">
          {searchData.map((item, index) => (
            <div key={index} className="relative flex flex-row gap-2 items-center">
              <MagnifyingGlassIcon
                className="pointer-events-none h-4 w-4 text-[#6E6E6E]"
                aria-hidden="true"
              />
              <p className="text-base text-primary">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PopularSearch;
