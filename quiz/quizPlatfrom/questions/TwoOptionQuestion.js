import React, { useState } from "react";

export default function TwoOptionQuestion({ question, Marks, options }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="space-y-4 py-4">
      <div className="flex flex-row justify-between font-semibold w-full text-lg py-6">
        <p className="text-3xl font-medium">{question}</p>
          <div className="text-sm font-medium  w-[15%] text-center">
            <p className="border-[2px] border-gray-300 px-2 py-1 w-24 h-8 rounded-full">{Marks}</p>
            </div>
        </div>
        <div className="flex space-x-4 px-4 justify-start items-center">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(option)}
              className={`py-2 px-4 w-[151px] h-[73px] rounded-[17px] text-center font-medium border ${
                selectedOption === option
                  ? "bg-secondary text-white border-black"
                  : "bg-gray-200 text-gray-700 border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
