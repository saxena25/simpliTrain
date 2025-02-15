import React, { useState } from "react";

export default function MultiSelectQuestion({ question, index, options }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      // Remove the option if it's already selected
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      // Add the option to the selection
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div>
      <div className="space-y-4 py-4">
        {/* Question Section */}
        <div className="flex flex-row font-semibold text-lg">
          <p className="text-text mr-2">{index}.</p>
          <p className="text-text font-medium">{question}</p>
        </div>

        {/* Options Section */}
        <div className="flex flex-col space-y-4 px-4 justify-start items-start">
          {options.map((option, idx) => (
            <div key={idx} className="flex items-center py-1">
              <input
                id={`multi-${idx}`}
                name={`multiSelect-${index}`}
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionClick(option)}
                className="w-5 h-5 text-black bg-gray-100 border-gray-400 rounded focus:ring-black dark:focus:ring-black dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={`multi-${idx}`}
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
