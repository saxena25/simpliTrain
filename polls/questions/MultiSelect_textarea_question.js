import React, { useState } from "react";

export default function MultiSelect_textarea_question({
  question,
  index,
  options,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [otherText, setOtherText] = useState("");

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      // Remove the option if it's already selected
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      // Add the option to the selection
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleOtherTextChange = (event) => {
    setOtherText(event.target.value);
  };

  const isOtherOptionSelected =
    options.length > 0 && selectedOptions.includes(options[options.length - 1]); // Check if the last option is selected

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

          {/* Text Area for "Others (please specify)" */}
          <div className="w-full mt-4 pl-14">
            <textarea
              value={otherText}
              onChange={handleOtherTextChange}
              rows="2"
              placeholder="Type your answer"
              disabled={!isOtherOptionSelected} // Disable unless the last option is selected
              className={`block w-full rounded-md border px-3 py-2 shadow-sm sm:text-lg ${
                isOtherOptionSelected
                  ? "border-gray-300 bg-white text-gray-500 focus:border-gray-400 focus:ring-black"
                  : "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
