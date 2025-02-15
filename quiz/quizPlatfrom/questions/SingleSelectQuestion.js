import React, { useState } from "react";

export default function SingleSelectQuestion({ question, Marks, options }) {
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

        <div className="flex flex-col space-y-4 px-4 justify-start items-start">
          {options.map((option, idx) => (
            <div key={idx} className="flex items-center py-1">
              <input
                id={`single-${idx}`}
                name={`singleSelect-${Marks}`}
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionClick(option)}
                className="relative size-4 appearance-none rounded-lg border border-gray-500 bg-white before:absolute before:inset-1 before:rounded-lg before:bg-white checked:border-black checked:bg-black  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
              />
              <label
                htmlFor={`single-${idx}`}
                className="ml-3 block text-md font-medium text-gray-500"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
