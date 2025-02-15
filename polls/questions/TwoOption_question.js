import React, { useState } from "react";

export default function TwoOptionQuestion({ question, index, options }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="space-y-4 py-4">
        <div className="flex flex-row font-semibold text-lg">
          <p className="text-text mr-2">{index}.</p>
          <p className="text-text font-medium"> {question}</p>
        </div>
        <div className="flex space-x-10 px-4 justify-start items-center">
          {options.map((option, idx) => (
            <div className="flex items-center py-2">
              <input
                id={idx}
                name="Option"
                type="radio"
                className="relative size-4 appearance-none rounded-lg border border-gray-500 bg-white before:absolute before:inset-1 before:rounded-lg before:bg-white checked:border-black checked:bg-black  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
              />
              <label
                htmlFor={idx}
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
