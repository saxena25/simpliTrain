import React from "react";

function PollQuizHeader({ title }) {
  return (
    <div className="bg-white flex flex-row justify-between w-full mt-16 h-16 border items-center px-8">
      <div className="flex flex-row gap-4 items-center">
        <h1 className="text-2xl text-black font-medium">S</h1>
        <div className="w-[2px] bg-gray-400 h-5"></div>
        <h1 className="text-base text-black font-semibold">{title}</h1>
      </div>
      
      <div className="flex flex-row gap-3">
        <button className="text-sm px-7 py-2 rounded-lg">
          Preview
        </button>
        <button className="text-sm bg-[#323232] text-white px-7 py-2 rounded-lg">
          Publish
        </button>
      </div>
    </div>
  );
}

export default PollQuizHeader;
